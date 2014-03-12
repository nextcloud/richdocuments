var webodf_version = "0.4.2-2050-g8d8fc02";
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
Runtime.prototype.requestAnimationFrame = function(callback) {
};
Runtime.prototype.cancelAnimationFrame = function(requestId) {
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
  function getUtf8LengthForString(string) {
    var l = string.length, i, n, j = 0;
    for(i = 0;i < l;i += 1) {
      n = string.charCodeAt(i);
      j += 1 + (n > 128) + (n > 2048);
      if(n > 55040 && n < 57344) {
        j += 1;
        i += 1
      }
    }
    return j
  }
  function utf8ByteArrayFromString(string, length, addBOM) {
    var l = string.length, bytearray, i, n, j;
    bytearray = new Uint8Array(new ArrayBuffer(length));
    if(addBOM) {
      bytearray[0] = 239;
      bytearray[1] = 187;
      bytearray[2] = 191;
      j = 3
    }else {
      j = 0
    }
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
          if(n <= 55040 || n >= 57344) {
            bytearray[j] = 224 | n >>> 12 & 15;
            bytearray[j + 1] = 128 | n >>> 6 & 63;
            bytearray[j + 2] = 128 | n & 63;
            j += 3
          }else {
            i += 1;
            n = (n - 55296 << 10 | string.charCodeAt(i) - 56320) + 65536;
            bytearray[j] = 240 | n >>> 18 & 7;
            bytearray[j + 1] = 128 | n >>> 12 & 63;
            bytearray[j + 2] = 128 | n >>> 6 & 63;
            bytearray[j + 3] = 128 | n & 63;
            j += 4
          }
        }
      }
    }
    return bytearray
  }
  function utf8ByteArrayFromXHRString(string, wishLength) {
    var addBOM = false, length = getUtf8LengthForString(string);
    if(typeof wishLength === "number") {
      if(wishLength !== length && wishLength !== length + 3) {
        return undefined
      }
      addBOM = length + 3 === wishLength;
      length = wishLength
    }
    return utf8ByteArrayFromString(string, length, addBOM)
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
      result = utf8ByteArrayFromString(string, getUtf8LengthForString(string), false)
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
  function stringToBinaryWorkaround(xhr) {
    var cl, data;
    cl = xhr.getResponseHeader("Content-Length");
    if(cl) {
      cl = parseInt(cl, 10)
    }
    if(cl && cl !== xhr.responseText.length) {
      data = utf8ByteArrayFromXHRString(xhr.responseText, cl)
    }
    if(data === undefined) {
      data = byteArrayFromString(xhr.responseText)
    }
    return data
  }
  function handleXHRResult(path, encoding, xhr) {
    var r, d, a, data;
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
              data = stringToBinaryWorkaround(xhr)
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
  };
  this.requestAnimationFrame = function(callback) {
    var rAF = window.requestAnimationFrame || (window.webkitRequestAnimationFrame || (window.mozRequestAnimationFrame || window.msRequestAnimationFrame)), requestId = 0;
    if(rAF) {
      rAF.bind(window);
      requestId = (rAF)(callback)
    }else {
      return setTimeout(callback, 15)
    }
    return requestId
  };
  this.cancelAnimationFrame = function(requestId) {
    var cAF = window.cancelAnimationFrame || (window.webkitCancelAnimationFrame || (window.mozCancelAnimationFrame || window.msCancelAnimationFrame));
    if(cAF) {
      cAF.bind(window);
      (cAF)(requestId)
    }else {
      clearTimeout(requestId)
    }
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
  this.requestAnimationFrame = function(callback) {
    return setTimeout(callback, 15)
  };
  this.cancelAnimationFrame = function(requestId) {
    clearTimeout(requestId)
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
  };
  this.requestAnimationFrame = function(callback) {
    callback();
    return 0
  };
  this.cancelAnimationFrame = function() {
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
  function loadDependenciesFromManifest(dir, dependencies, expectFail) {
    var path = dir + "/manifest.json", content, list, manifest, m;
    runtime.log("Loading manifest: " + path);
    try {
      content = runtime.readFileSync(path, "utf-8")
    }catch(e) {
      if(expectFail) {
        runtime.log("No loadable manifest found.")
      }else {
        console.log(String(e));
        throw e;
      }
      return
    }
    list = JSON.parse((content));
    manifest = (list);
    for(m in manifest) {
      if(manifest.hasOwnProperty(m)) {
        dependencies[m] = {dir:dir, deps:manifest[m]}
      }
    }
  }
  function loadDependenciesFromManifests() {
    var dependencies = [], paths = runtime.libraryPaths(), i;
    if(runtime.currentDirectory() && paths.indexOf(runtime.currentDirectory()) === -1) {
      loadDependenciesFromManifest(runtime.currentDirectory(), dependencies, true)
    }
    for(i = 0;i < paths.length;i += 1) {
      loadDependenciesFromManifest(paths[i], dependencies)
    }
    return dependencies
  }
  function getPath(dir, className) {
    return dir + "/" + className.replace(".", "/") + ".js"
  }
  function getLoadList(classNames, dependencies, isDefined) {
    var loadList = [], stack = {}, visited = {};
    function visit(n) {
      if(visited[n] || isDefined(n)) {
        return
      }
      if(stack[n]) {
        throw"Circular dependency detected for " + n + ".";
      }
      stack[n] = true;
      if(!dependencies[n]) {
        throw"Missing dependency information for class " + n + ".";
      }
      var d = dependencies[n], deps = d.deps, i, l = deps.length;
      for(i = 0;i < l;i += 1) {
        visit(deps[i])
      }
      stack[n] = false;
      visited[n] = true;
      loadList.push(getPath(d.dir, n))
    }
    classNames.forEach(visit);
    return loadList
  }
  function addContent(path, content) {
    content += "\n//# sourceURL=" + path;
    content += "\n//@ sourceURL=" + path;
    return content
  }
  function loadFiles(paths) {
    var i, content;
    for(i = 0;i < paths.length;i += 1) {
      content = runtime.readFileSync(paths[i], "utf-8");
      content = addContent(paths[i], (content));
      eval(content)
    }
  }
  function loadFilesInBrowser(paths, callback) {
    var e = document.currentScript || document.documentElement.lastChild, df = document.createDocumentFragment(), script, i;
    for(i = 0;i < paths.length;i += 1) {
      script = document.createElement("script");
      script.type = "text/javascript";
      script.charset = "utf-8";
      script.async = false;
      script.setAttribute("src", paths[i]);
      df.appendChild(script)
    }
    if(callback) {
      script.onload = callback
    }
    e.parentNode.insertBefore(df, e)
  }
  var dependencies, packages = {core:core, gui:gui, xmldom:xmldom, odf:odf, ops:ops};
  function isDefined(classname) {
    var parts = classname.split("."), i, p = packages, l = parts.length;
    for(i = 0;i < l;i += 1) {
      if(!p.hasOwnProperty(parts[i])) {
        return false
      }
      p = (p[parts[i]])
    }
    return true
  }
  runtime.loadClasses = function(classnames, callback) {
    if(IS_COMPILED_CODE || classnames.length === 0) {
      return callback && callback()
    }
    dependencies = dependencies || loadDependenciesFromManifests();
    classnames = getLoadList(classnames, dependencies, isDefined);
    if(classnames.length === 0) {
      return callback && callback()
    }
    if(runtime.type() === "BrowserRuntime" && callback) {
      loadFilesInBrowser(classnames, callback)
    }else {
      loadFiles(classnames);
      if(callback) {
        callback()
      }
    }
  };
  runtime.loadClass = function(classname, callback) {
    runtime.loadClasses([classname], callback)
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
      var path = "", pathEndIndex = script.lastIndexOf("/"), codestring = (code);
      if(pathEndIndex !== -1) {
        path = script.substring(0, pathEndIndex)
      }else {
        path = "."
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
    var range, directBoundingRect, rangeBoundingRect, testContainer, testElement, detectedQuirks, window, document, docElement, body, docOverflow, bodyOverflow, bodyHeight, bodyScroll;
    if(browserQuirks === undefined) {
      window = runtime.getWindow();
      document = window && window.document;
      docElement = document.documentElement;
      body = document.body;
      browserQuirks = {rangeBCRIgnoresElementBCR:false, unscaledRangeClientRects:false, elementBCRIgnoresBodyScroll:false};
      if(document) {
        testContainer = document.createElement("div");
        testContainer.style.position = "absolute";
        testContainer.style.left = "-99999px";
        testContainer.style.transform = "scale(2)";
        testContainer.style["-webkit-transform"] = "scale(2)";
        testElement = document.createElement("div");
        testContainer.appendChild(testElement);
        body.appendChild(testContainer);
        range = document.createRange();
        range.selectNode(testElement);
        browserQuirks.rangeBCRIgnoresElementBCR = range.getClientRects().length === 0;
        testElement.appendChild(document.createTextNode("Rect transform test"));
        directBoundingRect = testElement.getBoundingClientRect();
        rangeBoundingRect = range.getBoundingClientRect();
        browserQuirks.unscaledRangeClientRects = Math.abs(directBoundingRect.height - rangeBoundingRect.height) > 2;
        testContainer.style.transform = "";
        testContainer.style["-webkit-transform"] = "";
        docOverflow = docElement.style.overflow;
        bodyOverflow = body.style.overflow;
        bodyHeight = body.style.height;
        bodyScroll = body.scrollTop;
        docElement.style.overflow = "visible";
        body.style.overflow = "visible";
        body.style.height = "200%";
        body.scrollTop = body.scrollHeight;
        browserQuirks.elementBCRIgnoresBodyScroll = range.getBoundingClientRect().top !== testElement.getBoundingClientRect().top;
        body.scrollTop = bodyScroll;
        body.style.height = bodyHeight;
        body.style.overflow = bodyOverflow;
        docElement.style.overflow = docOverflow;
        range.detach();
        body.removeChild(testContainer);
        detectedQuirks = Object.keys(browserQuirks).map(function(quirk) {
          return quirk + ":" + String(browserQuirks[quirk])
        }).join(", ");
        runtime.log("Detected browser quirks - " + detectedQuirks)
      }
    }
    return browserQuirks
  }
  function getDirectChild(parent, ns, name) {
    var node = parent ? parent.firstElementChild : null;
    while(node) {
      if(node.localName === name && node.namespaceURI === ns) {
        return(node)
      }
      node = node.nextElementSibling
    }
    return null
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
    function splitBoundaries(range) {
      var modifiedNodes = [], originalEndContainer, resetToContainerLength, end, splitStart, node, text, offset;
      if(range.startContainer.nodeType === Node.TEXT_NODE || range.endContainer.nodeType === Node.TEXT_NODE) {
        originalEndContainer = range.endContainer;
        resetToContainerLength = range.endContainer.nodeType !== Node.TEXT_NODE ? range.endOffset === range.endContainer.childNodes.length : false;
        end = findStablePoint(range.endContainer, range.endOffset);
        if(end.container === originalEndContainer) {
          originalEndContainer = null
        }
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
        if(originalEndContainer !== null) {
          node = range.endContainer;
          while(node.parentNode && node.parentNode !== originalEndContainer) {
            node = node.parentNode
          }
          if(resetToContainerLength) {
            offset = originalEndContainer.childNodes.length
          }else {
            offset = getPositionInContainingNode(node, originalEndContainer)
          }
          range.setEnd(originalEndContainer, offset)
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
    function maximumOffset(node) {
      return node.nodeType === Node.TEXT_NODE ? (node).length : node.childNodes.length
    }
    function getNodesInRange(range, nodeFilter, whatToShow) {
      var document = range.startContainer.ownerDocument, elements = [], rangeRoot = range.commonAncestorContainer, root = (rangeRoot.nodeType === Node.TEXT_NODE ? rangeRoot.parentNode : rangeRoot), treeWalker = document.createTreeWalker(root, whatToShow, nodeFilter, false), currentNode, lastNodeInRange, endNodeCompareFlags, comparePositionResult;
      if(range.endContainer.childNodes[range.endOffset - 1]) {
        lastNodeInRange = (range.endContainer.childNodes[range.endOffset - 1]);
        endNodeCompareFlags = Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINED_BY
      }else {
        lastNodeInRange = (range.endContainer);
        endNodeCompareFlags = Node.DOCUMENT_POSITION_PRECEDING
      }
      if(range.startContainer.childNodes[range.startOffset]) {
        currentNode = (range.startContainer.childNodes[range.startOffset]);
        treeWalker.currentNode = currentNode
      }else {
        if(range.startOffset === maximumOffset(range.startContainer)) {
          currentNode = (range.startContainer);
          treeWalker.currentNode = currentNode;
          treeWalker.lastChild();
          currentNode = treeWalker.nextNode()
        }else {
          currentNode = (range.startContainer);
          treeWalker.currentNode = currentNode
        }
      }
      if(currentNode && nodeFilter(currentNode) === NodeFilter.FILTER_ACCEPT) {
        elements.push(currentNode)
      }
      currentNode = treeWalker.nextNode();
      while(currentNode) {
        comparePositionResult = lastNodeInRange.compareDocumentPosition(currentNode);
        if(comparePositionResult !== 0 && (comparePositionResult & endNodeCompareFlags) === 0) {
          break
        }
        elements.push(currentNode);
        currentNode = treeWalker.nextNode()
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
      if(parent && shouldRemove(targetNode)) {
        mergeIntoParent(targetNode)
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
    function containsNode(parent, descendant) {
      return parent === descendant || (parent).contains((descendant))
    }
    this.containsNode = containsNode;
    function containsNodeForBrokenWebKit(parent, descendant) {
      return parent === descendant || Boolean(parent.compareDocumentPosition(descendant) & Node.DOCUMENT_POSITION_CONTAINED_BY)
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
      var doc = (node.ownerDocument), quirks = getBrowserQuirks(), range, element, rect, body = doc.body;
      if(quirks.unscaledRangeClientRects === false || quirks.rangeBCRIgnoresElementBCR) {
        if(node.nodeType === Node.ELEMENT_NODE) {
          element = (node);
          rect = element.getBoundingClientRect();
          if(quirks.elementBCRIgnoresBodyScroll) {
            return({left:rect.left + body.scrollLeft, right:rect.right + body.scrollLeft, top:rect.top + body.scrollTop, bottom:rect.bottom + body.scrollTop, width:rect.width, height:rect.height})
          }
          return rect
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
        var parts = key.split(":"), prefix = parts[0], localName = parts[1], ns = nsResolver(prefix), value = properties[key], valueType = typeof value, element;
        if(valueType === "object") {
          if(Object.keys((value)).length) {
            if(ns) {
              element = (node.getElementsByTagNameNS(ns, localName)[0]) || node.ownerDocument.createElementNS(ns, key)
            }else {
              element = (node.getElementsByTagName(localName)[0]) || node.ownerDocument.createElement(key)
            }
            node.appendChild(element);
            mapObjOntoNode(element, (value), nsResolver)
          }
        }else {
          if(ns) {
            runtime.assert(valueType === "number" || valueType === "string", "attempting to map unsupported type '" + valueType + "' (key: " + key + ")");
            node.setAttributeNS(ns, key, String(value))
          }
        }
      })
    }
    this.mapObjOntoNode = mapObjOntoNode;
    this.getDirectChild = getDirectChild;
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
core.Destroyable = function Destroyable() {
};
core.Destroyable.prototype.destroy = function(callback) {
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
    eventListener[eventId].push(cb)
  };
  this.unsubscribe = function(eventId, cb) {
    var cbIndex;
    runtime.assert(eventListener.hasOwnProperty(eventId), 'tried to unsubscribe from unknown event "' + eventId + '"');
    cbIndex = eventListener[eventId].indexOf(cb);
    runtime.assert(cbIndex !== -1, 'tried to unsubscribe unknown callback from event "' + eventId + '"');
    if(cbIndex !== -1) {
      eventListener[eventId].splice(cbIndex, 1)
    }
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
  function moveToAcceptedNode() {
    var node = walker.currentNode, filterResult, moveResult;
    filterResult = nodeFilter(node);
    if(node !== root) {
      node = node.parentNode;
      while(node && node !== root) {
        if(nodeFilter(node) === FILTER_REJECT) {
          walker.currentNode = node;
          filterResult = FILTER_REJECT
        }
        node = node.parentNode
      }
    }
    if(filterResult === FILTER_REJECT) {
      currentPos = 1;
      moveResult = self.nextPosition()
    }else {
      if(filterResult === FILTER_ACCEPT) {
        moveResult = true
      }else {
        moveResult = self.nextPosition()
      }
    }
    if(moveResult) {
      runtime.assert(nodeFilter(walker.currentNode) === FILTER_ACCEPT, "moveToAcceptedNode did not result in walker being on an accepted node")
    }
    return moveResult
  }
  this.setPositionBeforeElement = function(element) {
    runtime.assert(Boolean(element), "setPositionBeforeElement called without element");
    walker.currentNode = element;
    currentPos = 0;
    return moveToAcceptedNode()
  };
  this.setUnfilteredPosition = function(container, offset) {
    var text;
    runtime.assert(Boolean(container), "PositionIterator.setUnfilteredPosition called without container");
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
    if(offset < container.childNodes.length) {
      walker.currentNode = (container.childNodes.item(offset));
      currentPos = 0
    }else {
      currentPos = 1
    }
    return moveToAcceptedNode()
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
  this.isBeforeNode = function() {
    return currentPos === 0
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
    whatToShow = whatToShow || NodeFilter.SHOW_ALL;
    runtime.assert(root.nodeType !== Node.TEXT_NODE, "Internet Explorer doesn't allow tree walker roots to be text nodes");
    walker = root.ownerDocument.createTreeWalker(root, whatToShow, nodeFilter, expandEntityReferences);
    currentPos = 0;
    if(walker.firstChild() === null) {
      currentPos = 1
    }
  }
  init()
};
core.PositionFilter = function PositionFilter() {
};
core.PositionFilter.FilterResult = {FILTER_ACCEPT:1, FILTER_REJECT:2, FILTER_SKIP:3};
core.PositionFilter.prototype.acceptPosition = function(point) {
};
(function() {
  return core.PositionFilter
})();
core.PositionFilterChain = function PositionFilterChain() {
  var filterChain = [], FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT, FILTER_REJECT = core.PositionFilter.FilterResult.FILTER_REJECT;
  this.acceptPosition = function(iterator) {
    var i;
    for(i = 0;i < filterChain.length;i += 1) {
      if(filterChain[i].acceptPosition(iterator) === FILTER_REJECT) {
        return FILTER_REJECT
      }
    }
    return FILTER_ACCEPT
  };
  this.addFilter = function(filterInstance) {
    filterChain.push(filterInstance)
  }
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
/*

 Copyright (C) 2014 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
core.StepIterator = function StepIterator(filter, iterator) {
  var FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT, cachedContainer, cachedOffset, cachedFilterResult;
  function resetCache() {
    cachedContainer = null;
    cachedOffset = undefined;
    cachedFilterResult = undefined
  }
  function isStep() {
    if(cachedFilterResult === undefined) {
      cachedFilterResult = filter.acceptPosition(iterator) === FILTER_ACCEPT
    }
    return(cachedFilterResult)
  }
  this.isStep = isStep;
  function setPosition(newContainer, newOffset) {
    resetCache();
    return iterator.setUnfilteredPosition(newContainer, newOffset)
  }
  this.setPosition = setPosition;
  function container() {
    if(!cachedContainer) {
      cachedContainer = iterator.container()
    }
    return cachedContainer
  }
  this.container = container;
  function offset() {
    if(cachedOffset === undefined) {
      cachedOffset = iterator.unfilteredDomOffset()
    }
    return(cachedOffset)
  }
  this.offset = offset;
  function nextStep() {
    resetCache();
    while(iterator.nextPosition()) {
      resetCache();
      if(isStep()) {
        return true
      }
    }
    return false
  }
  this.nextStep = nextStep;
  function previousStep() {
    resetCache();
    while(iterator.previousPosition()) {
      resetCache();
      if(isStep()) {
        return true
      }
    }
    return false
  }
  this.previousStep = previousStep;
  this.roundToClosestStep = function() {
    var currentContainer = container(), currentOffset = offset(), isAtStep = isStep();
    if(!isAtStep) {
      isAtStep = previousStep();
      if(!isAtStep) {
        setPosition(currentContainer, currentOffset);
        isAtStep = nextStep()
      }
    }
    return isAtStep
  };
  this.roundToPreviousStep = function() {
    var isAtStep = isStep();
    if(!isAtStep) {
      isAtStep = previousStep()
    }
    return isAtStep
  };
  this.roundToNextStep = function() {
    var isAtStep = isStep();
    if(!isAtStep) {
      isAtStep = nextStep()
    }
    return isAtStep
  }
};
core.TestData;
core.AsyncTestData;
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
core.UnitTestLogger = function UnitTestLogger() {
  var messages = [], errors = 0, start = 0, suite = "", test = "";
  this.startTest = function(suiteName, testName) {
    messages = [];
    errors = 0;
    suite = suiteName;
    test = testName;
    start = (new Date).getTime()
  };
  this.endTest = function() {
    var end = (new Date).getTime();
    return{description:test, suite:[suite, test], success:errors === 0, log:messages, time:end - start}
  };
  this.debug = function(msg) {
    messages.push({category:"debug", message:msg})
  };
  this.fail = function(msg) {
    errors += 1;
    messages.push({category:"fail", message:msg})
  };
  this.pass = function(msg) {
    messages.push({category:"pass", message:msg})
  }
};
core.UnitTestRunner = function UnitTestRunner(resourcePrefix, logger) {
  var failedTests = 0, failedTestsOnBeginExpectFail, areObjectsEqual, expectFail = false;
  this.resourcePrefix = function() {
    return resourcePrefix
  };
  this.beginExpectFail = function() {
    failedTestsOnBeginExpectFail = failedTests;
    expectFail = true
  };
  this.endExpectFail = function() {
    var hasNoFailedTests = failedTestsOnBeginExpectFail === failedTests;
    expectFail = false;
    failedTests = failedTestsOnBeginExpectFail;
    if(hasNoFailedTests) {
      failedTests += 1;
      logger.fail("Expected at least one failed test, but none registered.")
    }
  };
  function debug(msg) {
    logger.debug(msg)
  }
  function testFailed(msg) {
    failedTests += 1;
    if(!expectFail) {
      logger.fail(msg)
    }else {
      logger.debug(msg)
    }
  }
  function testPassed(msg) {
    logger.pass(msg)
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
    if(actual === null || expected === null) {
      return false
    }
    if(typeof expected === "number" && isNaN(expected)) {
      return typeof actual === "number" && isNaN(actual)
    }
    if(Object.prototype.toString.call(expected) === Object.prototype.toString.call([])) {
      return areArraysEqual((actual), (expected))
    }
    if(typeof expected === "object" && typeof actual === "object") {
      if((expected).constructor === Element || (expected).constructor === Node) {
        return areNodesEqual((actual), (expected))
      }
      return areObjectsEqual((actual), (expected))
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
  this.testFailed = testFailed;
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
  var self = this, failedTests = 0, logger = new core.UnitTestLogger, results = {}, inBrowser = runtime.type() === "BrowserRuntime";
  this.resourcePrefix = "";
  function link(text, code) {
    return"<span style='color:blue;cursor:pointer' onclick='" + code + "'>" + text + "</span>"
  }
  this.reporter = function(r) {
    var i, m;
    if(inBrowser) {
      runtime.log("<span>Running " + link(r.description, 'runTest("' + r.suite[0] + '","' + r.description + '")') + "</span>")
    }else {
      runtime.log("Running " + r.description)
    }
    if(!r.success) {
      for(i = 0;i < r.log.length;i += 1) {
        m = r.log[i];
        runtime.log(m.category, m.message)
      }
    }
  };
  function report(r) {
    if(self.reporter) {
      self.reporter(r)
    }
  }
  this.runTests = function(TestClass, callback, testNames) {
    var testName = Runtime.getFunctionName(TestClass) || "", tname, runner = new core.UnitTestRunner(self.resourcePrefix, logger), test = new TestClass(runner), testResults = {}, i, t, tests, texpectFail, lastFailCount;
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
      texpectFail = tests[i].expectFail === true;
      if(testNames.length && testNames.indexOf(tname) === -1) {
        continue
      }
      lastFailCount = runner.countFailedTests();
      test.setUp();
      logger.startTest(testName, tname);
      if(texpectFail) {
        runner.beginExpectFail()
      }
      try {
        t()
      }catch(e) {
        runner.testFailed("Unexpected exception encountered: " + e.toString() + "\n" + e.stack)
      }
      if(texpectFail) {
        runner.endExpectFail()
      }
      report(logger.endTest());
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
      var fname = todo[0].name, expectFail = todo[0].expectFail === true;
      lastFailCount = runner.countFailedTests();
      if(testNames.length && testNames.indexOf(fname) === -1) {
        runAsyncTests(todo.slice(1))
      }else {
        test.setUp();
        logger.startTest(testName, fname);
        if(expectFail) {
          runner.beginExpectFail()
        }
        t(function() {
          if(expectFail) {
            runner.endExpectFail()
          }
          report(logger.endTest());
          test.tearDown();
          testResults[fname] = lastFailCount === runner.countFailedTests();
          runAsyncTests(todo.slice(1))
        })
      }
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
xmldom.LSSerializerFilter = function LSSerializerFilter() {
};
xmldom.LSSerializerFilter.prototype.acceptNode = function(node) {
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
  var styleInfo = new odf.StyleInfo, domUtils = new core.DomUtils, officens = "urn:oasis:names:tc:opendocument:xmlns:office:1.0", manifestns = "urn:oasis:names:tc:opendocument:xmlns:manifest:1.0", webodfns = "urn:webodf:names:scope", stylens = odf.Namespaces.stylens, nodeorder = ["meta", "settings", "scripts", "font-face-decls", "styles", "automatic-styles", "master-styles", "body"], automaticStylePrefix = (new Date).getTime() + "_webodf_", base64 = new core.Base64, documentStylesScope = "document-styles", 
  documentContentScope = "document-content";
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
  odf.AnnotationElement = function AnnotationElement() {
  };
  odf.AnnotationElement.prototype.annotationEndElement;
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
    function linkAnnotationStartAndEndElements(rootElement) {
      var document = rootElement.ownerDocument, annotationStarts = {}, n, name, annotationStart, nodeIterator = document.createNodeIterator(rootElement, NodeFilter.SHOW_ELEMENT, null, false);
      n = (nodeIterator.nextNode());
      while(n) {
        if(n.namespaceURI === officens) {
          if(n.localName === "annotation") {
            name = n.getAttributeNS(officens, "name");
            if(name) {
              if(annotationStarts.hasOwnProperty(name)) {
                runtime.log("Warning: annotation name used more than once with <office:annotation/>: '" + name + "'")
              }else {
                annotationStarts[name] = n
              }
            }
          }else {
            if(n.localName === "annotation-end") {
              name = n.getAttributeNS(officens, "name");
              if(name) {
                if(annotationStarts.hasOwnProperty(name)) {
                  annotationStart = (annotationStarts[name]);
                  if(!annotationStart.annotationEndElement) {
                    annotationStart.annotationEndElement = n
                  }else {
                    runtime.log("Warning: annotation name used more than once with <office:annotation-end/>: '" + name + "'")
                  }
                }else {
                  runtime.log("Warning: annotation end without an annotation start, name: '" + name + "'")
                }
              }else {
                runtime.log("Warning: annotation end without a name found")
              }
            }
          }
        }
        n = (nodeIterator.nextNode())
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
          node = (doc.importNode(xmldoc.documentElement, true))
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
      root.fontFaceDecls = domUtils.getDirectChild(root, officens, "font-face-decls");
      root.styles = domUtils.getDirectChild(root, officens, "styles");
      root.automaticStyles = domUtils.getDirectChild(root, officens, "automatic-styles");
      root.masterStyles = domUtils.getDirectChild(root, officens, "master-styles");
      root.body = domUtils.getDirectChild(root, officens, "body");
      root.meta = domUtils.getDirectChild(root, officens, "meta");
      linkAnnotationStartAndEndElements(root)
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
      root.fontFaceDecls = domUtils.getDirectChild(node, officens, "font-face-decls");
      setChild(root, root.fontFaceDecls);
      n = domUtils.getDirectChild(node, officens, "styles");
      root.styles = n || xmldoc.createElementNS(officens, "styles");
      setChild(root, root.styles);
      n = domUtils.getDirectChild(node, officens, "automatic-styles");
      root.automaticStyles = n || xmldoc.createElementNS(officens, "automatic-styles");
      setAutomaticStylesScope(root.automaticStyles, documentStylesScope);
      setChild(root, root.automaticStyles);
      node = domUtils.getDirectChild(node, officens, "master-styles");
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
      fontFaceDecls = domUtils.getDirectChild(node, officens, "font-face-decls");
      if(root.fontFaceDecls && fontFaceDecls) {
        fontFaceNameChangeMap = mergeFontFaceDecls(root.fontFaceDecls, fontFaceDecls)
      }else {
        if(fontFaceDecls) {
          root.fontFaceDecls = fontFaceDecls;
          setChild(root, fontFaceDecls)
        }
      }
      automaticStyles = domUtils.getDirectChild(node, officens, "automatic-styles");
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
      node = domUtils.getDirectChild(node, officens, "body");
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
      root.meta = domUtils.getDirectChild(node, officens, "meta");
      setChild(root, root.meta)
    }
    function handleSettingsXml(xmldoc) {
      var node = importRootNode(xmldoc), root;
      if(!node || (node.localName !== "document-settings" || node.namespaceURI !== officens)) {
        return
      }
      root = self.rootElement;
      root.settings = domUtils.getDirectChild(node, officens, "settings");
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
        linkAnnotationStartAndEndElements(self.rootElement);
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
      var header = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n', xml = '<manifest:manifest xmlns:manifest="' + manifestns + '" manifest:version="1.2"></manifest:manifest>', manifest = (runtime.parseXML(xml)), manifestRoot = manifest.documentElement, serializer = new xmldom.LSSerializer, fullPath;
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
      if(self.rootElement.settings.firstElementChild) {
        s += serializer.writeToString(self.rootElement.settings, odf.Namespaces.namespaceMap)
      }
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
        contentElement = domUtils.getDirectChild(body, officens, "text") || (domUtils.getDirectChild(body, officens, "presentation") || domUtils.getDirectChild(body, officens, "spreadsheet"))
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
      partMimetypes["/"] = "application/vnd.oasis.opendocument.text";
      partMimetypes["settings.xml"] = "text/xml";
      partMimetypes["meta.xml"] = "text/xml";
      partMimetypes["styles.xml"] = "text/xml";
      partMimetypes["content.xml"] = "text/xml";
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
odf.OdfUtils = function OdfUtils() {
  var textns = odf.Namespaces.textns, drawns = odf.Namespaces.drawns, xlinkns = odf.Namespaces.xlinkns, whitespaceOnly = /^\s*$/, domUtils = new core.DomUtils;
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
  function isHyperlink(node) {
    var name = node && node.localName;
    return name === "a" && node.namespaceURI === textns
  }
  this.isHyperlink = isHyperlink;
  this.getHyperlinkTarget = function(element) {
    return element.getAttributeNS(xlinkns, "href")
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
    return(node)
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
  function isTextContentContainingNode(node) {
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
          case "cursor":
          ;
          case "editinfo":
            return false
        }
        break
    }
    return true
  }
  this.isTextContentContainingNode = isTextContentContainingNode;
  function isSignificantTextContent(textNode) {
    return Boolean(getParagraphElement(textNode) && (!isODFWhitespace(textNode.textContent) || isSignificantWhitespace(textNode, 0)))
  }
  function removePartiallyContainedNodes(range, nodes) {
    while(nodes.length > 0 && !domUtils.rangeContainsNode(range, (nodes[0]))) {
      nodes.shift()
    }
    while(nodes.length > 0 && !domUtils.rangeContainsNode(range, (nodes[nodes.length - 1]))) {
      nodes.pop()
    }
  }
  function getTextNodes(range, includePartial) {
    var textNodes;
    function nodeFilter(node) {
      var result = NodeFilter.FILTER_REJECT;
      if(node.nodeType === Node.TEXT_NODE) {
        if(isSignificantTextContent((node))) {
          result = NodeFilter.FILTER_ACCEPT
        }
      }else {
        if(isTextContentContainingNode(node)) {
          result = NodeFilter.FILTER_SKIP
        }
      }
      return result
    }
    textNodes = domUtils.getNodesInRange(range, nodeFilter, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    if(!includePartial) {
      removePartiallyContainedNodes(range, textNodes)
    }
    return textNodes
  }
  this.getTextNodes = getTextNodes;
  function getTextElements(range, includePartial, includeInsignificantWhitespace) {
    var elements;
    function nodeFilter(node) {
      var result = NodeFilter.FILTER_REJECT;
      if(isCharacterElement(node.parentNode) || isInlineRoot(node)) {
        result = NodeFilter.FILTER_REJECT
      }else {
        if(node.nodeType === Node.TEXT_NODE) {
          if(includeInsignificantWhitespace || isSignificantTextContent((node))) {
            result = NodeFilter.FILTER_ACCEPT
          }
        }else {
          if(isAnchoredAsCharacterElement(node)) {
            result = NodeFilter.FILTER_ACCEPT
          }else {
            if(isTextContentContainingNode(node) || isGroupingElement(node)) {
              result = NodeFilter.FILTER_SKIP
            }
          }
        }
      }
      return result
    }
    elements = domUtils.getNodesInRange(range, nodeFilter, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    if(!includePartial) {
      removePartiallyContainedNodes(range, elements)
    }
    return elements
  }
  this.getTextElements = getTextElements;
  function prependParentContainers(startContainer, elements, filter) {
    var container = startContainer;
    while(container) {
      if(filter(container)) {
        if(elements[0] !== container) {
          elements.unshift(container)
        }
        break
      }
      if(isInlineRoot(container)) {
        break
      }
      container = container.parentNode
    }
  }
  this.getParagraphElements = function(range) {
    var elements;
    function nodeFilter(node) {
      var result = NodeFilter.FILTER_REJECT;
      if(isParagraph(node)) {
        result = NodeFilter.FILTER_ACCEPT
      }else {
        if(isTextContentContainingNode(node) || isGroupingElement(node)) {
          result = NodeFilter.FILTER_SKIP
        }
      }
      return result
    }
    elements = domUtils.getNodesInRange(range, nodeFilter, NodeFilter.SHOW_ELEMENT);
    prependParentContainers((range.startContainer), elements, isParagraph);
    return elements
  };
  this.getImageElements = function(range) {
    var elements;
    function nodeFilter(node) {
      var result = NodeFilter.FILTER_SKIP;
      if(isImage(node)) {
        result = NodeFilter.FILTER_ACCEPT
      }
      return result
    }
    elements = domUtils.getNodesInRange(range, nodeFilter, NodeFilter.SHOW_ELEMENT);
    prependParentContainers((range.startContainer), elements, isImage);
    return elements
  };
  function getRightNode(container, offset) {
    var node = container;
    if(offset < node.childNodes.length - 1) {
      node = (node.childNodes[offset + 1])
    }else {
      while(!node.nextSibling) {
        node = node.parentNode
      }
      node = node.nextSibling
    }
    while(node.firstChild) {
      node = node.firstChild
    }
    return node
  }
  this.getHyperlinkElements = function(range) {
    var links = [], newRange = (range.cloneRange()), node, textNodes;
    if(range.collapsed && range.endContainer.nodeType === Node.ELEMENT_NODE) {
      node = getRightNode(range.endContainer, range.endOffset);
      if(node.nodeType === Node.TEXT_NODE) {
        newRange.setEnd(node, 1)
      }
    }
    textNodes = getTextElements(newRange, true, false);
    textNodes.forEach(function(node) {
      var parent = node.parentNode;
      while(!isParagraph(parent)) {
        if(isHyperlink(parent) && links.indexOf(parent) === -1) {
          links.push(parent);
          break
        }
        parent = parent.parentNode
      }
    });
    newRange.detach();
    return links
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
gui.AnnotationViewManager = function AnnotationViewManager(canvas, odfFragment, annotationsPane, showAnnotationRemoveButton) {
  var annotations = [], doc = odfFragment.ownerDocument, odfUtils = new odf.OdfUtils, CONNECTOR_MARGIN = 30, NOTE_MARGIN = 20, window = runtime.getWindow();
  runtime.assert(Boolean(window), "Expected to be run in an environment which has a global window, like a browser.");
  function wrapAnnotation(annotation) {
    var annotationWrapper = doc.createElement("div"), annotationNote = doc.createElement("div"), connectorHorizontal = doc.createElement("div"), connectorAngular = doc.createElement("div"), removeButton;
    annotationWrapper.className = "annotationWrapper";
    annotation.parentNode.insertBefore(annotationWrapper, annotation);
    annotationNote.className = "annotationNote";
    annotationNote.appendChild(annotation);
    if(showAnnotationRemoveButton) {
      removeButton = doc.createElement("div");
      removeButton.className = "annotationRemoveButton";
      annotationNote.appendChild(removeButton)
    }
    connectorHorizontal.className = "annotationConnector horizontal";
    connectorAngular.className = "annotationConnector angular";
    annotationWrapper.appendChild(annotationNote);
    annotationWrapper.appendChild(connectorHorizontal);
    annotationWrapper.appendChild(connectorAngular)
  }
  function unwrapAnnotation(annotation) {
    var annotationWrapper = annotation.parentNode.parentNode;
    if(annotationWrapper.localName === "div") {
      annotationWrapper.parentNode.insertBefore(annotation, annotationWrapper);
      annotationWrapper.parentNode.removeChild(annotationWrapper)
    }
  }
  function highlightAnnotation(annotation) {
    var annotationEnd = annotation.annotationEndElement, range = doc.createRange(), annotationName = annotation.getAttributeNS(odf.Namespaces.officens, "name"), textNodes;
    if(annotationEnd) {
      range.setStart(annotation, annotation.childNodes.length);
      range.setEnd(annotationEnd, 0);
      textNodes = odfUtils.getTextNodes(range, false);
      textNodes.forEach(function(n) {
        var container = doc.createElement("span");
        container.className = "annotationHighlight";
        container.setAttribute("annotation", annotationName);
        n.parentNode.insertBefore(container, n);
        container.appendChild(n)
      })
    }
    range.detach()
  }
  function unhighlightAnnotation(annotation) {
    var annotationName = annotation.getAttributeNS(odf.Namespaces.officens, "name"), highlightSpans = doc.querySelectorAll('span.annotationHighlight[annotation="' + annotationName + '"]'), i, container;
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
    var annotationNote = (annotation.parentNode), connectorHorizontal = annotationNote.nextElementSibling, connectorAngular = connectorHorizontal.nextElementSibling, annotationWrapper = (annotationNote.parentNode), connectorAngle = 0, previousAnnotation = annotations[annotations.indexOf(annotation) - 1], previousRect, zoomLevel = canvas.getZoomLevel();
    annotationNote.style.left = (annotationsPane.getBoundingClientRect().left - annotationWrapper.getBoundingClientRect().left) / zoomLevel + "px";
    annotationNote.style.width = annotationsPane.getBoundingClientRect().width / zoomLevel + "px";
    connectorHorizontal.style.width = parseFloat(annotationNote.style.left) - CONNECTOR_MARGIN + "px";
    if(previousAnnotation) {
      previousRect = (previousAnnotation.parentNode).getBoundingClientRect();
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
      if((a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0) {
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
  function getMinimumHeightForAnnotationPane() {
    if(annotationsPane.style.display !== "none" && annotations.length > 0) {
      return((annotations[annotations.length - 1].parentNode).getBoundingClientRect().bottom - annotationsPane.getBoundingClientRect().top) / canvas.getZoomLevel() + "px"
    }
    return null
  }
  this.getMinimumHeightForAnnotationPane = getMinimumHeightForAnnotationPane;
  function addAnnotation(annotation) {
    showAnnotationsPane(true);
    annotations.push(annotation);
    sortAnnotations();
    wrapAnnotation(annotation);
    if(annotation.annotationEndElement) {
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
    if(includeSystemDefault !== false) {
      propertiesMap = getSystemDefaultStyleAttributes(styleFamily);
      inheritedPropertiesMap = utils.mergeObjects(propertiesMap, inheritedPropertiesMap)
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
      parent = (parent.parentNode)
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
  function isCommonStyleElement(styleNode) {
    return styleNode.parentNode === odfContainer.rootElement.styles
  }
  function calculateAppliedStyle(styleChain) {
    var mergedChildStyle = {orderedStyles:[]};
    styleChain.forEach(function(elementStyleSet) {
      Object.keys((elementStyleSet)).forEach(function(styleFamily) {
        var styleName = Object.keys(elementStyleSet[styleFamily])[0], styleSummary = {name:styleName, family:styleFamily, displayName:undefined, isCommonStyle:false}, styleElement, parentStyle;
        styleElement = getStyleElement(styleName, styleFamily);
        if(styleElement) {
          parentStyle = getInheritedStyleAttributes((styleElement));
          mergedChildStyle = utils.mergeObjects(parentStyle, mergedChildStyle);
          styleSummary.displayName = styleElement.getAttributeNS(stylens, "display-name");
          styleSummary.isCommonStyle = isCommonStyleElement(styleElement)
        }else {
          runtime.log("No style element found for '" + styleName + "' of family '" + styleFamily + "'")
        }
        mergedChildStyle.orderedStyles.push(styleSummary)
      })
    });
    return mergedChildStyle
  }
  function getAppliedStyles(nodes, calculatedStylesCache) {
    var styleChains = {}, styles = [];
    if(!calculatedStylesCache) {
      calculatedStylesCache = {}
    }
    nodes.forEach(function(n) {
      buildStyleChain(n, styleChains)
    });
    Object.keys(styleChains).forEach(function(key) {
      if(!calculatedStylesCache[key]) {
        calculatedStylesCache[key] = calculateAppliedStyle(styleChains[key])
      }
      styles.push(calculatedStylesCache[key])
    });
    return styles
  }
  this.getAppliedStyles = getAppliedStyles;
  this.getAppliedStylesForElement = function(node, calculatedStylesCache) {
    return getAppliedStyles([node], calculatedStylesCache)[0]
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
  this.createDerivedStyleObject = function(parentStyleName, family, overrides) {
    var originalStyleElement = (getStyleElement(parentStyleName, family)), newStyleObject;
    runtime.assert(Boolean(originalStyleElement), "No style element found for '" + parentStyleName + "' of family '" + family + "'");
    if(isCommonStyleElement(originalStyleElement)) {
      newStyleObject = {"style:parent-style-name":parentStyleName}
    }else {
      newStyleObject = getStyleAttributes(originalStyleElement)
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
      pageLayoutElement = domUtils.getDirectChild(odfContainer.rootElement.styles, stylens, "default-page-layout")
    }
    props = domUtils.getDirectChild(pageLayoutElement, stylens, "page-layout-properties");
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
odf.StyleTreeNode = function StyleTreeNode(element) {
  this.derivedStyles = {};
  this.element = element
};
odf.Style2CSS = function Style2CSS() {
  var drawns = odf.Namespaces.drawns, fons = odf.Namespaces.fons, officens = odf.Namespaces.officens, stylens = odf.Namespaces.stylens, svgns = odf.Namespaces.svgns, tablens = odf.Namespaces.tablens, textns = odf.Namespaces.textns, xlinkns = odf.Namespaces.xlinkns, presentationns = odf.Namespaces.presentationns, domUtils = new core.DomUtils, familynamespaceprefixes = {"graphic":"draw", "drawing-page":"draw", "paragraph":"text", "presentation":"presentation", "ruby":"text", "section":"text", "table":"table", 
  "table-cell":"table", "table-column":"table", "table-row":"table", "text":"text", "list":"text", "page":"office"}, familytagnames = {"graphic":["circle", "connected", "control", "custom-shape", "ellipse", "frame", "g", "line", "measure", "page", "page-thumbnail", "path", "polygon", "polyline", "rect", "regular-polygon"], "paragraph":["alphabetical-index-entry-template", "h", "illustration-index-entry-template", "index-source-style", "object-index-entry-template", "p", "table-index-entry-template", 
  "table-of-content-entry-template", "user-index-entry-template"], "presentation":["caption", "circle", "connector", "control", "custom-shape", "ellipse", "frame", "g", "line", "measure", "page-thumbnail", "path", "polygon", "polyline", "rect", "regular-polygon"], "drawing-page":["caption", "circle", "connector", "control", "page", "custom-shape", "ellipse", "frame", "g", "line", "measure", "page-thumbnail", "path", "polygon", "polyline", "rect", "regular-polygon"], "ruby":["ruby", "ruby-text"], 
  "section":["alphabetical-index", "bibliography", "illustration-index", "index-title", "object-index", "section", "table-of-content", "table-index", "user-index"], "table":["background", "table"], "table-cell":["body", "covered-table-cell", "even-columns", "even-rows", "first-column", "first-row", "last-column", "last-row", "odd-columns", "odd-rows", "table-cell"], "table-column":["table-column"], "table-row":["table-row"], "text":["a", "index-entry-chapter", "index-entry-link-end", "index-entry-link-start", 
  "index-entry-page-number", "index-entry-span", "index-entry-tab-stop", "index-entry-text", "index-title-template", "linenumbering-configuration", "list-level-style-number", "list-level-style-bullet", "outline-level-style", "span"], "list":["list-item"]}, textPropertySimpleMapping = [[fons, "color", "color"], [fons, "background-color", "background-color"], [fons, "font-weight", "font-weight"], [fons, "font-style", "font-style"]], bgImageSimpleMapping = [[stylens, "repeat", "background-repeat"]], 
  paragraphPropertySimpleMapping = [[fons, "background-color", "background-color"], [fons, "text-align", "text-align"], [fons, "text-indent", "text-indent"], [fons, "padding", "padding"], [fons, "padding-left", "padding-left"], [fons, "padding-right", "padding-right"], [fons, "padding-top", "padding-top"], [fons, "padding-bottom", "padding-bottom"], [fons, "border-left", "border-left"], [fons, "border-right", "border-right"], [fons, "border-top", "border-top"], [fons, "border-bottom", "border-bottom"], 
  [fons, "margin", "margin"], [fons, "margin-left", "margin-left"], [fons, "margin-right", "margin-right"], [fons, "margin-top", "margin-top"], [fons, "margin-bottom", "margin-bottom"], [fons, "border", "border"]], graphicPropertySimpleMapping = [[fons, "background-color", "background-color"], [fons, "min-height", "min-height"], [drawns, "stroke", "border"], [svgns, "stroke-color", "border-color"], [svgns, "stroke-width", "border-width"], [fons, "border", "border"], [fons, "border-left", "border-left"], 
  [fons, "border-right", "border-right"], [fons, "border-top", "border-top"], [fons, "border-bottom", "border-bottom"]], tablecellPropertySimpleMapping = [[fons, "background-color", "background-color"], [fons, "border-left", "border-left"], [fons, "border-right", "border-right"], [fons, "border-top", "border-top"], [fons, "border-bottom", "border-bottom"], [fons, "border", "border"]], tablecolumnPropertySimpleMapping = [[stylens, "column-width", "width"]], tablerowPropertySimpleMapping = [[stylens, 
  "row-height", "height"], [fons, "keep-together", null]], tablePropertySimpleMapping = [[stylens, "width", "width"], [fons, "margin-left", "margin-left"], [fons, "margin-right", "margin-right"], [fons, "margin-top", "margin-top"], [fons, "margin-bottom", "margin-bottom"]], pageContentPropertySimpleMapping = [[fons, "background-color", "background-color"], [fons, "padding", "padding"], [fons, "padding-left", "padding-left"], [fons, "padding-right", "padding-right"], [fons, "padding-top", "padding-top"], 
  [fons, "padding-bottom", "padding-bottom"], [fons, "border", "border"], [fons, "border-left", "border-left"], [fons, "border-right", "border-right"], [fons, "border-top", "border-top"], [fons, "border-bottom", "border-bottom"], [fons, "margin", "margin"], [fons, "margin-left", "margin-left"], [fons, "margin-right", "margin-right"], [fons, "margin-top", "margin-top"], [fons, "margin-bottom", "margin-bottom"]], pageSizePropertySimpleMapping = [[fons, "page-width", "width"], [fons, "page-height", 
  "height"]], borderPropertyMap = {"border":true, "border-left":true, "border-right":true, "border-top":true, "border-bottom":true, "stroke-width":true}, fontFaceDeclsMap = {}, utils = new odf.OdfUtils, documentType, odfRoot, defaultFontSize, xpath = xmldom.XPath, cssUnits = new core.CSSUnits;
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
    var props = domUtils.getDirectChild(styleNode, stylens, "text-properties");
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
    parentStyle = (props.parentNode);
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
    bgimage = domUtils.getDirectChild(props, stylens, "background-image");
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
    properties = domUtils.getDirectChild(node.element, stylens, "text-properties");
    if(properties) {
      rule += getTextProperties(properties)
    }
    properties = domUtils.getDirectChild(node.element, stylens, "paragraph-properties");
    if(properties) {
      rule += getParagraphProperties(properties)
    }
    properties = domUtils.getDirectChild(node.element, stylens, "graphic-properties");
    if(properties) {
      rule += getGraphicProperties(properties)
    }
    properties = domUtils.getDirectChild(node.element, stylens, "drawing-page-properties");
    if(properties) {
      rule += getDrawingPageProperties(properties)
    }
    properties = domUtils.getDirectChild(node.element, stylens, "table-cell-properties");
    if(properties) {
      rule += getTableCellProperties(properties)
    }
    properties = domUtils.getDirectChild(node.element, stylens, "table-row-properties");
    if(properties) {
      rule += getTableRowProperties(properties)
    }
    properties = domUtils.getDirectChild(node.element, stylens, "table-column-properties");
    if(properties) {
      rule += getTableColumnProperties(properties)
    }
    properties = domUtils.getDirectChild(node.element, stylens, "table-properties");
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
    var selector = 'text|list[text|style-name="' + name + '"]', level = node.getAttributeNS(textns, "level"), itemSelector, listItemRule, listLevelProps = domUtils.getDirectChild(node, stylens, "list-level-properties"), listLevelLabelAlign = domUtils.getDirectChild(listLevelProps, stylens, "list-level-label-alignment"), bulletIndent, listIndent, bulletWidth, rule;
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
    var rule = "", imageProps, url, contentLayoutRule = "", pageSizeRule = "", props = domUtils.getDirectChild(node, stylens, "page-layout-properties"), stylename, masterStyles, e, masterStyleName;
    if(!props) {
      return
    }
    stylename = node.getAttributeNS(stylens, "name");
    rule += applySimpleMapping(props, pageContentPropertySimpleMapping);
    imageProps = domUtils.getDirectChild(props, stylens, "background-image");
    if(imageProps) {
      url = imageProps.getAttributeNS(xlinkns, "href");
      if(url) {
        rule += "background-image: url('odfkit:" + url + "');";
        rule += applySimpleMapping(imageProps, bgImageSimpleMapping)
      }
    }
    if(documentType === "presentation") {
      masterStyles = domUtils.getDirectChild((node.parentNode.parentNode), officens, "master-styles");
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

 Copyright (C) 2014 KO GmbH <copyright@kogmbh.com>

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
(function() {
  function Point(x, y) {
    var self = this;
    this.getDistance = function(point) {
      var xOffset = self.x - point.x, yOffset = self.y - point.y;
      return Math.sqrt(xOffset * xOffset + yOffset * yOffset)
    };
    this.getCenter = function(point) {
      return new Point((self.x + point.x) / 2, (self.y + point.y) / 2)
    };
    this.x;
    this.y;
    function init() {
      self.x = x;
      self.y = y
    }
    init()
  }
  gui.ZoomHelper = function() {
    var zoomableElement, panPoint, previousPanPoint, firstPinchDistance, zoom, previousZoom, maxZoom = 4, offsetParent, events = new core.EventNotifier([gui.ZoomHelper.signalZoomChanged]), gestures = {NONE:0, SCROLL:1, PINCH:2}, currentGesture = gestures.NONE, requiresCustomScrollBars = runtime.getWindow().hasOwnProperty("ontouchstart");
    function applyCSSTransform(x, y, scale, is3D) {
      var transformCommand;
      if(is3D) {
        transformCommand = "translate3d(" + x + "px, " + y + "px, 0) scale3d(" + scale + ", " + scale + ", 1)"
      }else {
        transformCommand = "translate(" + x + "px, " + y + "px) scale(" + scale + ")"
      }
      zoomableElement.style.WebkitTransform = transformCommand;
      zoomableElement.style.MozTransform = transformCommand;
      zoomableElement.style.msTransform = transformCommand;
      zoomableElement.style.OTransform = transformCommand;
      zoomableElement.style.transform = transformCommand
    }
    function applyTransform(is3D) {
      if(is3D) {
        applyCSSTransform(-panPoint.x, -panPoint.y, zoom, true)
      }else {
        applyCSSTransform(0, 0, zoom, true);
        applyCSSTransform(0, 0, zoom, false)
      }
    }
    function applyFastTransform() {
      applyTransform(true)
    }
    function applyDetailedTransform() {
      applyTransform(false)
    }
    function enableScrollBars(enable) {
      if(!offsetParent || !requiresCustomScrollBars) {
        return
      }
      var initialOverflow = offsetParent.style.overflow, enabled = offsetParent.classList.contains("customScrollbars");
      if(enable && enabled || !enable && !enabled) {
        return
      }
      if(enable) {
        offsetParent.classList.add("customScrollbars");
        offsetParent.style.overflow = "hidden";
        runtime.requestAnimationFrame(function() {
          offsetParent.style.overflow = initialOverflow
        })
      }else {
        offsetParent.classList.remove("customScrollbars")
      }
    }
    function removeScroll() {
      applyCSSTransform(-panPoint.x, -panPoint.y, zoom, true);
      offsetParent.scrollLeft = 0;
      offsetParent.scrollTop = 0;
      enableScrollBars(false)
    }
    function restoreScroll() {
      applyCSSTransform(0, 0, zoom, true);
      offsetParent.scrollLeft = panPoint.x;
      offsetParent.scrollTop = panPoint.y;
      enableScrollBars(true)
    }
    function getPoint(touch) {
      return new Point(touch.pageX - zoomableElement.offsetLeft, touch.pageY - zoomableElement.offsetTop)
    }
    function sanitizePointForPan(point) {
      return new Point(Math.min(Math.max(point.x, zoomableElement.offsetLeft), (zoomableElement.offsetLeft + zoomableElement.offsetWidth) * zoom - offsetParent.clientWidth), Math.min(Math.max(point.y, zoomableElement.offsetTop), (zoomableElement.offsetTop + zoomableElement.offsetHeight) * zoom - offsetParent.clientHeight))
    }
    function processPan(point) {
      if(previousPanPoint) {
        panPoint.x -= point.x - previousPanPoint.x;
        panPoint.y -= point.y - previousPanPoint.y;
        panPoint = sanitizePointForPan(panPoint)
      }
      previousPanPoint = point
    }
    function processZoom(zoomPoint, incrementalZoom) {
      var originalZoom = zoom, actuallyIncrementedZoom, minZoom = Math.min(maxZoom, zoomableElement.offsetParent.clientWidth / zoomableElement.offsetWidth);
      zoom = previousZoom * incrementalZoom;
      zoom = Math.min(Math.max(zoom, minZoom), maxZoom);
      actuallyIncrementedZoom = zoom / originalZoom;
      panPoint.x += (actuallyIncrementedZoom - 1) * (zoomPoint.x + panPoint.x);
      panPoint.y += (actuallyIncrementedZoom - 1) * (zoomPoint.y + panPoint.y)
    }
    function processPinch(point1, point2) {
      var zoomPoint = point1.getCenter(point2), pinchDistance = point1.getDistance(point2), incrementalZoom = pinchDistance / firstPinchDistance;
      processPan(zoomPoint);
      processZoom(zoomPoint, incrementalZoom)
    }
    function prepareGesture(event) {
      var fingers = event.touches.length, point1 = fingers > 0 ? getPoint(event.touches[0]) : null, point2 = fingers > 1 ? getPoint(event.touches[1]) : null;
      if(point1 && point2) {
        firstPinchDistance = point1.getDistance(point2);
        previousZoom = zoom;
        previousPanPoint = point1.getCenter(point2);
        removeScroll();
        currentGesture = gestures.PINCH
      }else {
        if(point1) {
          previousPanPoint = point1;
          currentGesture = gestures.SCROLL
        }
      }
    }
    function processGesture(event) {
      var fingers = event.touches.length, point1 = fingers > 0 ? getPoint(event.touches[0]) : null, point2 = fingers > 1 ? getPoint(event.touches[1]) : null;
      if(point1 && point2) {
        event.preventDefault();
        if(currentGesture === gestures.SCROLL) {
          currentGesture = gestures.PINCH;
          removeScroll();
          firstPinchDistance = point1.getDistance(point2);
          return
        }
        processPinch(point1, point2);
        applyFastTransform()
      }else {
        if(point1) {
          if(currentGesture === gestures.PINCH) {
            currentGesture = gestures.SCROLL;
            restoreScroll();
            return
          }
          processPan(point1)
        }
      }
    }
    function sanitizeGesture() {
      if(currentGesture === gestures.PINCH) {
        events.emit(gui.ZoomHelper.signalZoomChanged, zoom);
        restoreScroll();
        applyDetailedTransform()
      }
      currentGesture = gestures.NONE
    }
    this.subscribe = function(eventid, cb) {
      events.subscribe(eventid, cb)
    };
    this.unsubscribe = function(eventid, cb) {
      events.unsubscribe(eventid, cb)
    };
    this.getZoomLevel = function() {
      return zoom
    };
    this.setZoomLevel = function(zoomLevel) {
      if(zoomableElement) {
        zoom = zoomLevel;
        applyDetailedTransform();
        events.emit(gui.ZoomHelper.signalZoomChanged, zoom)
      }
    };
    function registerGestureListeners() {
      if(offsetParent) {
        offsetParent.addEventListener("touchstart", (prepareGesture), false);
        offsetParent.addEventListener("touchmove", (processGesture), false);
        offsetParent.addEventListener("touchend", (sanitizeGesture), false)
      }
    }
    function unregisterGestureListeners() {
      if(offsetParent) {
        offsetParent.removeEventListener("touchstart", (prepareGesture), false);
        offsetParent.removeEventListener("touchmove", (processGesture), false);
        offsetParent.removeEventListener("touchend", (sanitizeGesture), false)
      }
    }
    this.destroy = function(callback) {
      unregisterGestureListeners();
      enableScrollBars(false);
      callback()
    };
    this.setZoomableElement = function(element) {
      unregisterGestureListeners();
      zoomableElement = element;
      offsetParent = (zoomableElement.offsetParent);
      applyDetailedTransform();
      registerGestureListeners();
      enableScrollBars(true)
    };
    function init() {
      zoom = 1;
      previousZoom = 1;
      panPoint = new Point(0, 0)
    }
    init()
  };
  gui.ZoomHelper.signalZoomChanged = "zoomChanged"
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
ops.Canvas = function Canvas() {
};
ops.Canvas.prototype.getZoomLevel = function() {
};
ops.Canvas.prototype.getElement = function() {
};
ops.Canvas.prototype.getZoomHelper = function() {
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
  function clearCSSStyleSheet(style) {
    var stylesheet = (style.sheet), cssRules = stylesheet.cssRules;
    while(cssRules.length) {
      stylesheet.deleteRule(cssRules.length - 1)
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
    var masterStyles = odfContainer.rootElement.masterStyles, masterStylesChild = masterStyles.firstElementChild;
    while(masterStylesChild) {
      if(masterStylesChild.getAttributeNS(stylens, "name") === masterPageName && (masterStylesChild.localName === "master-page" && masterStylesChild.namespaceURI === stylens)) {
        break
      }
      masterStylesChild = masterStylesChild.nextElementSibling
    }
    return masterStylesChild
  }
  function dropTemplateDrawFrames(clonedNode) {
    var i, element, presentationClass, clonedDrawFrameElements = clonedNode.getElementsByTagNameNS(drawns, "frame");
    for(i = 0;i < clonedDrawFrameElements.length;i += 1) {
      element = (clonedDrawFrameElements[i]);
      presentationClass = element.getAttributeNS(presentationns, "class");
      if(presentationClass && !/^(date-time|footer|header|page-number)$/.test(presentationClass)) {
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
          node = (node.parentNode)
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
  function findWebODFStyleSheet(head) {
    var style = head.firstElementChild;
    while(style && !(style.localName === "style" && style.hasAttribute("webodfcss"))) {
      style = style.nextElementSibling
    }
    return(style)
  }
  function addWebODFStyleSheet(document) {
    var head = (document.getElementsByTagName("head")[0]), css, style, href, count = document.styleSheets.length;
    style = findWebODFStyleSheet(head);
    if(style) {
      count = parseInt(style.getAttribute("webodfcss"), 10);
      style.setAttribute("webodfcss", count + 1);
      return style
    }
    if(String(typeof webodf_css) === "string") {
      css = (webodf_css)
    }else {
      href = "webodf.css";
      if(runtime.currentDirectory) {
        href = runtime.currentDirectory();
        if(href.length > 0 && href.substr(-1) !== "/") {
          href += "/"
        }
        href += "../webodf.css"
      }
      css = (runtime.readFileSync(href, "utf-8"))
    }
    style = (document.createElementNS(head.namespaceURI, "style"));
    style.setAttribute("media", "screen, print, handheld, projection");
    style.setAttribute("type", "text/css");
    style.setAttribute("webodfcss", "1");
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
    return style
  }
  function removeWebODFStyleSheet(webodfcss) {
    var count = parseInt(webodfcss.getAttribute("webodfcss"), 10);
    if(count === 1) {
      webodfcss.parentNode.removeChild(webodfcss)
    }else {
      webodfcss.setAttribute("count", count - 1)
    }
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
    var self = this, doc = (element.ownerDocument), async = new core.Async, odfcontainer, formatting = new odf.Formatting, pageSwitcher, sizer = null, annotationsPane = null, allowAnnotations = false, showAnnotationRemoveButton = false, annotationViewManager = null, webodfcss, fontcss, stylesxmlcss, positioncss, shadowContent, eventHandlers = {}, waitingForDoneTimeoutId, redrawContainerTask, shouldRefreshCss = false, shouldRerenderAnnotations = false, loadingQueue = new LoadingQueue, zoomHelper = 
    new gui.ZoomHelper;
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
      var minHeight, odfdoc = sizer.firstChild, zoomLevel = zoomHelper.getZoomLevel();
      if(!odfdoc) {
        return
      }
      sizer.style.WebkitTransformOrigin = "0% 0%";
      sizer.style.MozTransformOrigin = "0% 0%";
      sizer.style.msTransformOrigin = "0% 0%";
      sizer.style.OTransformOrigin = "0% 0%";
      sizer.style.transformOrigin = "0% 0%";
      if(annotationViewManager) {
        minHeight = annotationViewManager.getMinimumHeightForAnnotationPane();
        if(minHeight) {
          sizer.style.minHeight = minHeight
        }else {
          sizer.style.removeProperty("min-height")
        }
      }
      element.style.width = Math.round(zoomLevel * sizer.offsetWidth) + "px";
      element.style.height = Math.round(zoomLevel * sizer.offsetHeight) + "px"
    }
    function redrawContainer() {
      if(shouldRefreshCss) {
        handleStyles(odfcontainer, formatting, stylesxmlcss);
        shouldRefreshCss = false
      }
      if(shouldRerenderAnnotations) {
        if(annotationViewManager) {
          annotationViewManager.rerenderAnnotations()
        }
        shouldRerenderAnnotations = false
      }
      fixContainerSize()
    }
    function handleContent(container, odfnode) {
      var css = (positioncss.sheet);
      clear(element);
      sizer = (doc.createElementNS(element.namespaceURI, "div"));
      sizer.style.display = "inline-block";
      sizer.style.background = "white";
      sizer.style.setProperty("float", "left", "important");
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
      modifyLineBreakElements(odfnode.body);
      expandSpaceElements(odfnode.body);
      expandTabElements(odfnode.body);
      loadImages(container, odfnode.body, css);
      loadVideos(container, odfnode.body);
      loadLists(odfnode.body, css, element.namespaceURI);
      sizer.insertBefore(shadowContent, sizer.firstChild);
      zoomHelper.setZoomableElement(sizer)
    }
    function modifyAnnotations(odffragment) {
      var annotationNodes = (domUtils.getElementsByTagNameNS(odffragment, officens, "annotation"));
      annotationNodes.forEach(annotationViewManager.addAnnotation);
      annotationViewManager.rerenderAnnotations()
    }
    function handleAnnotations(odfnode) {
      if(allowAnnotations) {
        if(!annotationsPane.parentNode) {
          sizer.appendChild(annotationsPane)
        }
        if(annotationViewManager) {
          annotationViewManager.forgetAnnotations()
        }
        annotationViewManager = new gui.AnnotationViewManager(self, odfnode.body, annotationsPane, showAnnotationRemoveButton);
        modifyAnnotations(odfnode.body);
        fixContainerSize()
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
        clearCSSStyleSheet(fontcss);
        clearCSSStyleSheet(stylesxmlcss);
        clearCSSStyleSheet(positioncss);
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
        waitingForDoneTimeoutId = runtime.setTimeout(function later_cb() {
          if(odfcontainer.state === odf.OdfContainer.DONE) {
            callback()
          }else {
            runtime.log("will be back later...");
            waitingForDoneTimeoutId = runtime.setTimeout(later_cb, 500)
          }
        }, 100)
      }
    }
    this.refreshCSS = function() {
      shouldRefreshCss = true;
      redrawContainerTask.trigger()
    };
    this.refreshSize = function() {
      redrawContainerTask.trigger()
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
        shouldRerenderAnnotations = true;
        redrawContainerTask.trigger()
      }
    };
    this.getSizer = function() {
      return(sizer)
    };
    this.enableAnnotations = function(allow, showRemoveButton) {
      if(allow !== allowAnnotations) {
        allowAnnotations = allow;
        showAnnotationRemoveButton = showRemoveButton;
        if(odfcontainer) {
          handleAnnotations(odfcontainer.rootElement)
        }
      }
    };
    this.addAnnotation = function(annotation) {
      if(annotationViewManager) {
        annotationViewManager.addAnnotation(annotation);
        fixContainerSize()
      }
    };
    this.forgetAnnotations = function() {
      if(annotationViewManager) {
        annotationViewManager.forgetAnnotations();
        fixContainerSize()
      }
    };
    this.getZoomHelper = function() {
      return zoomHelper
    };
    this.setZoomLevel = function(zoom) {
      zoomHelper.setZoomLevel(zoom)
    };
    this.getZoomLevel = function() {
      return zoomHelper.getZoomLevel()
    };
    this.fitToContainingElement = function(width, height) {
      var zoomLevel = zoomHelper.getZoomLevel(), realWidth = element.offsetWidth / zoomLevel, realHeight = element.offsetHeight / zoomLevel, zoom;
      zoom = width / realWidth;
      if(height / realHeight < zoom) {
        zoom = height / realHeight
      }
      zoomHelper.setZoomLevel(zoom)
    };
    this.fitToWidth = function(width) {
      var realWidth = element.offsetWidth / zoomHelper.getZoomLevel();
      zoomHelper.setZoomLevel(width / realWidth)
    };
    this.fitSmart = function(width, height) {
      var realWidth, realHeight, newScale, zoomLevel = zoomHelper.getZoomLevel();
      realWidth = element.offsetWidth / zoomLevel;
      realHeight = element.offsetHeight / zoomLevel;
      newScale = width / realWidth;
      if(height !== undefined) {
        if(height / realHeight < newScale) {
          newScale = height / realHeight
        }
      }
      zoomHelper.setZoomLevel(Math.min(1, newScale))
    };
    this.fitToHeight = function(height) {
      var realHeight = element.offsetHeight / zoomHelper.getZoomLevel();
      zoomHelper.setZoomLevel(height / realHeight)
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
      var head = (doc.getElementsByTagName("head")[0]), cleanup = [pageSwitcher.destroy, redrawContainerTask.destroy];
      runtime.clearTimeout(waitingForDoneTimeoutId);
      if(annotationsPane && annotationsPane.parentNode) {
        annotationsPane.parentNode.removeChild(annotationsPane)
      }
      zoomHelper.destroy(function() {
        if(sizer) {
          element.removeChild(sizer);
          sizer = null
        }
      });
      removeWebODFStyleSheet(webodfcss);
      head.removeChild(fontcss);
      head.removeChild(stylesxmlcss);
      head.removeChild(positioncss);
      async.destroyAll(cleanup, callback)
    };
    function init() {
      webodfcss = addWebODFStyleSheet(doc);
      pageSwitcher = new PageSwitcher(addStyleSheet(doc));
      fontcss = addStyleSheet(doc);
      stylesxmlcss = addStyleSheet(doc);
      positioncss = addStyleSheet(doc);
      redrawContainerTask = new core.ScheduledTask(redrawContainer, 0);
      zoomHelper.subscribe(gui.ZoomHelper.signalZoomChanged, fixContainerSize)
    }
    init()
  }
})();
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
ops.MemberProperties = function() {
  this.fullName;
  this.color;
  this.imageUrl
};
ops.Member = function Member(memberId, properties) {
  var props = new ops.MemberProperties;
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
    Object.keys(removedProperties).forEach(function(key) {
      if(key !== "fullName" && (key !== "color" && (key !== "imageUrl" && props.hasOwnProperty(key)))) {
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
gui.StepCounter;
gui.SelectionMover = function SelectionMover(cursor, rootNode) {
  var odfUtils = new odf.OdfUtils, positionIterator, FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT;
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
  function countLineSteps(filter, direction, iterator) {
    var c = iterator.container(), steps = 0, bestContainer = null, bestOffset, bestXDiff = 10, xDiff, bestCount = 0, top, left, lastTop, rect, range = (rootNode.ownerDocument.createRange()), watch = new core.LoopWatchDog(1E4);
    rect = getVisibleRect(c, iterator.unfilteredDomOffset(), range);
    top = rect.top;
    left = rect.left;
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
  this.getStepCounter = function() {
    return{convertForwardStepsBetweenFilters:convertForwardStepsBetweenFilters, convertBackwardStepsBetweenFilters:convertBackwardStepsBetweenFilters, countLinesSteps:countLinesSteps, countStepsToLineBoundary:countStepsToLineBoundary}
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
ops.Document = function Document() {
};
ops.Document.prototype.getMemberIds = function() {
};
ops.Document.prototype.removeCursor = function(memberid) {
};
ops.Document.prototype.getDocumentElement = function() {
};
ops.Document.prototype.getRootNode = function() {
};
ops.Document.prototype.getDOMDocument = function() {
};
ops.Document.prototype.cloneDocumentElement = function() {
};
ops.Document.prototype.setDocumentElement = function(element) {
};
ops.Document.prototype.subscribe = function(eventid, cb) {
};
ops.Document.prototype.unsubscribe = function(eventid, cb) {
};
ops.Document.prototype.getCanvas = function() {
};
ops.Document.prototype.createRootFilter = function(inputMemberId) {
};
ops.Document.signalCursorAdded = "cursor/added";
ops.Document.signalCursorRemoved = "cursor/removed";
ops.Document.signalCursorMoved = "cursor/moved";
ops.Document.signalMemberAdded = "member/added";
ops.Document.signalMemberUpdated = "member/updated";
ops.Document.signalMemberRemoved = "member/removed";
ops.OdtCursor = function OdtCursor(memberId, document) {
  var self = this, validSelectionTypes = {}, selectionType, selectionMover, cursor, events = new core.EventNotifier([ops.OdtCursor.signalCursorUpdated]);
  this.removeFromDocument = function() {
    cursor.remove()
  };
  this.subscribe = function(eventid, cb) {
    events.subscribe(eventid, cb)
  };
  this.unsubscribe = function(eventid, cb) {
    events.unsubscribe(eventid, cb)
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
    events.emit(ops.OdtCursor.signalCursorUpdated, self)
  };
  this.hasForwardSelection = function() {
    return cursor.hasForwardSelection()
  };
  this.getDocument = function() {
    return document
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
    cursor = new core.Cursor(document.getDOMDocument(), memberId);
    selectionMover = new gui.SelectionMover(cursor, document.getRootNode());
    validSelectionTypes[ops.OdtCursor.RangeSelection] = true;
    validSelectionTypes[ops.OdtCursor.RegionSelection] = true;
    self.resetSelectionType()
  }
  init()
};
ops.OdtCursor.RangeSelection = "Range";
ops.OdtCursor.RegionSelection = "Region";
ops.OdtCursor.signalCursorUpdated = "cursorUpdated";
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
ops.Operation = function Operation() {
};
ops.Operation.prototype.init = function(data) {
};
ops.Operation.prototype.isEdit;
ops.Operation.prototype.group;
ops.Operation.prototype.execute = function(document) {
};
ops.Operation.prototype.spec = function() {
};
/*

 Copyright (C) 2010-2014 KO GmbH <copyright@kogmbh.com>

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
(function() {
  var nextNodeId = 0;
  ops.StepsCache = function StepsCache(rootElement, filter, bucketSize) {
    var coordinatens = "urn:webodf:names:steps", stepToDomPoint = {}, nodeToBookmark = {}, odfUtils = new odf.OdfUtils, domUtils = new core.DomUtils, basePoint, lastUndamagedCacheStep, FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT, verifyCache;
    function ParagraphBookmark(nodeId, steps, paragraphNode) {
      this.nodeId = nodeId;
      this.steps = steps;
      this.node = paragraphNode;
      this.nextBookmark = null;
      this.previousBookmark = null;
      this.setIteratorPosition = function(iterator) {
        iterator.setPositionBeforeElement(paragraphNode);
        do {
          if(filter.acceptPosition(iterator) === FILTER_ACCEPT) {
            break
          }
        }while(iterator.nextPosition())
      }
    }
    function RootBookmark(nodeId, steps, rootNode) {
      this.nodeId = nodeId;
      this.steps = steps;
      this.node = rootNode;
      this.nextBookmark = null;
      this.previousBookmark = null;
      this.setIteratorPosition = function(iterator) {
        iterator.setUnfilteredPosition(rootNode, 0);
        do {
          if(filter.acceptPosition(iterator) === FILTER_ACCEPT) {
            break
          }
        }while(iterator.nextPosition())
      }
    }
    function inspectBookmarks(bookmark1, bookmark2) {
      var parts = "[" + bookmark1.nodeId;
      if(bookmark2) {
        parts += " => " + bookmark2.nodeId
      }
      return parts + "]"
    }
    function isUndamagedBookmark(bookmark) {
      return lastUndamagedCacheStep === undefined || bookmark.steps <= lastUndamagedCacheStep
    }
    function verifyCacheImpl() {
      var bookmark = basePoint, previousBookmark, nextBookmark, documentPosition, loopCheck = new core.LoopWatchDog(0, 1E5);
      while(bookmark) {
        loopCheck.check();
        previousBookmark = bookmark.previousBookmark;
        if(previousBookmark) {
          runtime.assert(previousBookmark.nextBookmark === bookmark, "Broken bookmark link to previous @" + inspectBookmarks(previousBookmark, bookmark))
        }else {
          runtime.assert(bookmark === basePoint, "Broken bookmark link @" + inspectBookmarks(bookmark));
          runtime.assert(isUndamagedBookmark(basePoint), "Base point is damaged @" + inspectBookmarks(bookmark))
        }
        nextBookmark = bookmark.nextBookmark;
        if(nextBookmark) {
          runtime.assert(nextBookmark.previousBookmark === bookmark, "Broken bookmark link to next @" + inspectBookmarks(bookmark, nextBookmark))
        }
        if(isUndamagedBookmark(bookmark)) {
          runtime.assert(domUtils.containsNode(rootElement, bookmark.node), "Disconnected node is being reported as undamaged @" + inspectBookmarks(bookmark));
          if(previousBookmark) {
            documentPosition = bookmark.node.compareDocumentPosition(previousBookmark.node);
            runtime.assert(documentPosition === 0 || (documentPosition & Node.DOCUMENT_POSITION_PRECEDING) !== 0, "Bookmark order with previous does not reflect DOM order @" + inspectBookmarks(previousBookmark, bookmark))
          }
          if(nextBookmark) {
            if(domUtils.containsNode(rootElement, nextBookmark.node)) {
              documentPosition = bookmark.node.compareDocumentPosition(nextBookmark.node);
              runtime.assert(documentPosition === 0 || (documentPosition & Node.DOCUMENT_POSITION_FOLLOWING) !== 0, "Bookmark order with next does not reflect DOM order @" + inspectBookmarks(bookmark, nextBookmark))
            }
          }
        }
        bookmark = bookmark.nextBookmark
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
      var id = "";
      if(node.nodeType === Node.ELEMENT_NODE) {
        id = (node).getAttributeNS(coordinatens, "nodeId")
      }
      return id
    }
    function setNodeId(node) {
      var nodeId = nextNodeId.toString();
      node.setAttributeNS(coordinatens, "nodeId", nodeId);
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
        existingBookmark = nodeToBookmark[nodeId] = new ParagraphBookmark(nodeId, steps, node)
      }else {
        if(!isValidBookmarkForNode(node, existingBookmark)) {
          runtime.log("Cloned node detected. Creating new bookmark");
          nodeId = setNodeId(node);
          existingBookmark = nodeToBookmark[nodeId] = new ParagraphBookmark(nodeId, steps, node)
        }else {
          existingBookmark.steps = steps
        }
      }
      return existingBookmark
    }
    function getClosestBookmark(steps) {
      var cacheBucket, cachePoint, loopGuard = new core.LoopWatchDog(0, 1E4);
      if(lastUndamagedCacheStep !== undefined && steps > lastUndamagedCacheStep) {
        steps = lastUndamagedCacheStep
      }
      cacheBucket = getBucket(steps);
      while(!cachePoint && cacheBucket !== 0) {
        cachePoint = stepToDomPoint[cacheBucket];
        cacheBucket -= bucketSize
      }
      cachePoint = cachePoint || basePoint;
      while(cachePoint.nextBookmark && cachePoint.nextBookmark.steps <= steps) {
        loopGuard.check();
        cachePoint = cachePoint.nextBookmark
      }
      return cachePoint
    }
    function getUndamagedBookmark(bookmark) {
      if(lastUndamagedCacheStep !== undefined && bookmark.steps > lastUndamagedCacheStep) {
        bookmark = getClosestBookmark(lastUndamagedCacheStep)
      }
      return bookmark
    }
    function removeBookmark(currentBookmark) {
      if(currentBookmark.previousBookmark) {
        currentBookmark.previousBookmark.nextBookmark = currentBookmark.nextBookmark
      }
      if(currentBookmark.nextBookmark) {
        currentBookmark.nextBookmark.previousBookmark = currentBookmark.previousBookmark
      }
    }
    function insertBookmark(previousBookmark, newBookmark) {
      var nextBookmark;
      if(previousBookmark !== newBookmark && previousBookmark.nextBookmark !== newBookmark) {
        removeBookmark(newBookmark);
        nextBookmark = previousBookmark.nextBookmark;
        newBookmark.nextBookmark = previousBookmark.nextBookmark;
        newBookmark.previousBookmark = previousBookmark;
        previousBookmark.nextBookmark = newBookmark;
        if(nextBookmark) {
          nextBookmark.previousBookmark = newBookmark
        }
      }
    }
    function repairCacheUpToStep(currentIteratorStep) {
      var damagedBookmark, undamagedBookmark, nextBookmark, stepsBucket;
      if(lastUndamagedCacheStep !== undefined && lastUndamagedCacheStep < currentIteratorStep) {
        undamagedBookmark = getClosestBookmark(lastUndamagedCacheStep);
        damagedBookmark = undamagedBookmark.nextBookmark;
        while(damagedBookmark && damagedBookmark.steps <= currentIteratorStep) {
          nextBookmark = damagedBookmark.nextBookmark;
          stepsBucket = getDestinationBucket(damagedBookmark.steps);
          if(stepToDomPoint[stepsBucket] === damagedBookmark) {
            delete stepToDomPoint[stepsBucket]
          }
          if(!domUtils.containsNode(rootElement, damagedBookmark.node)) {
            removeBookmark(damagedBookmark);
            delete nodeToBookmark[damagedBookmark.nodeId]
          }else {
            damagedBookmark.steps = currentIteratorStep + 1
          }
          damagedBookmark = nextBookmark
        }
        lastUndamagedCacheStep = currentIteratorStep
      }else {
        undamagedBookmark = getClosestBookmark(currentIteratorStep)
      }
      return undamagedBookmark
    }
    this.updateCache = function(steps, iterator, isStep) {
      var cacheBucket, existingCachePoint, bookmark, closestPriorBookmark, node = iterator.getCurrentNode();
      if(iterator.isBeforeNode() && odfUtils.isParagraph(node)) {
        if(!isStep) {
          steps += 1
        }
        closestPriorBookmark = repairCacheUpToStep(steps);
        bookmark = getNodeBookmark((node), steps);
        insertBookmark(closestPriorBookmark, bookmark);
        cacheBucket = getDestinationBucket(bookmark.steps);
        existingCachePoint = stepToDomPoint[cacheBucket];
        if(!existingCachePoint || bookmark.steps > existingCachePoint.steps) {
          stepToDomPoint[cacheBucket] = bookmark
        }
        verifyCache()
      }
    };
    this.setToClosestStep = function(steps, iterator) {
      var cachePoint;
      verifyCache();
      cachePoint = getClosestBookmark(steps);
      cachePoint.setIteratorPosition(iterator);
      return cachePoint.steps
    };
    function findBookmarkedAncestor(node) {
      var currentNode = node, nodeId, bookmark = null;
      while(!bookmark && (currentNode && currentNode !== rootElement)) {
        nodeId = getNodeId(currentNode);
        if(nodeId) {
          bookmark = nodeToBookmark[nodeId];
          if(bookmark && !isValidBookmarkForNode(currentNode, bookmark)) {
            runtime.log("Cloned node detected. Creating new bookmark");
            bookmark = null;
            clearNodeId((currentNode))
          }
        }
        currentNode = currentNode.parentNode
      }
      return bookmark
    }
    this.setToClosestDomPoint = function(node, offset, iterator) {
      var bookmark, b, key;
      verifyCache();
      if(node === rootElement && offset === 0) {
        bookmark = basePoint
      }else {
        if(node === rootElement && offset === rootElement.childNodes.length) {
          bookmark = basePoint;
          for(key in stepToDomPoint) {
            if(stepToDomPoint.hasOwnProperty(key)) {
              b = stepToDomPoint[key];
              if(b.steps > bookmark.steps) {
                bookmark = b
              }
            }
          }
        }else {
          bookmark = findBookmarkedAncestor(node.childNodes.item(offset) || node);
          if(!bookmark) {
            iterator.setUnfilteredPosition(node, offset);
            while(!bookmark && iterator.previousNode()) {
              bookmark = findBookmarkedAncestor(iterator.getCurrentNode())
            }
          }
        }
      }
      bookmark = getUndamagedBookmark(bookmark || basePoint);
      bookmark.setIteratorPosition(iterator);
      return bookmark.steps
    };
    this.damageCacheAfterStep = function(inflectionStep) {
      if(inflectionStep < 0) {
        inflectionStep = 0
      }
      if(lastUndamagedCacheStep === undefined) {
        lastUndamagedCacheStep = inflectionStep
      }else {
        if(inflectionStep < lastUndamagedCacheStep) {
          lastUndamagedCacheStep = inflectionStep
        }
      }
      verifyCache()
    };
    function init() {
      var rootElementId = getNodeId(rootElement) || setNodeId(rootElement);
      basePoint = new RootBookmark(rootElementId, 0, rootElement);
      verifyCache = ops.StepsCache.ENABLE_CACHE_VERIFICATION ? verifyCacheImpl : function() {
      }
    }
    init()
  };
  ops.StepsCache.ENABLE_CACHE_VERIFICATION = false;
  ops.StepsCache.Bookmark = function Bookmark() {
  };
  ops.StepsCache.Bookmark.prototype.nodeId;
  ops.StepsCache.Bookmark.prototype.node;
  ops.StepsCache.Bookmark.prototype.steps;
  ops.StepsCache.Bookmark.prototype.previousBookmark;
  ops.StepsCache.Bookmark.prototype.nextBookmark;
  ops.StepsCache.Bookmark.prototype.setIteratorPosition = function(iterator) {
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
(function() {
  var PREVIOUS_STEP = 0, NEXT_STEP = 1;
  ops.StepsTranslator = function StepsTranslator(getRootNode, newIterator, filter, bucketSize) {
    var rootNode = getRootNode(), stepsCache = new ops.StepsCache(rootNode, filter, bucketSize), domUtils = new core.DomUtils, iterator = newIterator(getRootNode()), FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT;
    function verifyRootNode() {
      var currentRootNode = getRootNode();
      if(currentRootNode !== rootNode) {
        runtime.log("Undo detected. Resetting steps cache");
        rootNode = currentRootNode;
        stepsCache = new ops.StepsCache(rootNode, filter, bucketSize);
        iterator = newIterator(rootNode)
      }
    }
    this.convertStepsToDomPoint = function(steps) {
      var stepsFromRoot, isStep;
      if(isNaN(steps)) {
        throw new TypeError("Requested steps is not numeric (" + steps + ")");
      }
      if(steps < 0) {
        throw new RangeError("Requested steps is negative (" + steps + ")");
      }
      verifyRootNode();
      stepsFromRoot = stepsCache.setToClosestStep(steps, iterator);
      while(stepsFromRoot < steps && iterator.nextPosition()) {
        isStep = filter.acceptPosition(iterator) === FILTER_ACCEPT;
        if(isStep) {
          stepsFromRoot += 1
        }
        stepsCache.updateCache(stepsFromRoot, iterator, isStep)
      }
      if(stepsFromRoot !== steps) {
        throw new RangeError("Requested steps (" + steps + ") exceeds available steps (" + stepsFromRoot + ")");
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
      var stepsFromRoot, beforeRoot, destinationNode, destinationOffset, rounding = 0, isStep;
      verifyRootNode();
      if(!domUtils.containsNode(rootNode, node)) {
        beforeRoot = domUtils.comparePoints(rootNode, 0, node, offset) < 0;
        node = (rootNode);
        offset = beforeRoot ? 0 : (rootNode).childNodes.length
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
        isStep = filter.acceptPosition(iterator) === FILTER_ACCEPT;
        if(isStep) {
          stepsFromRoot += 1
        }
        stepsCache.updateCache(stepsFromRoot, iterator, isStep)
      }
      return stepsFromRoot + rounding
    };
    this.prime = function() {
      var stepsFromRoot, isStep;
      verifyRootNode();
      stepsFromRoot = stepsCache.setToClosestStep(0, iterator);
      while(iterator.nextPosition()) {
        isStep = filter.acceptPosition(iterator) === FILTER_ACCEPT;
        if(isStep) {
          stepsFromRoot += 1
        }
        stepsCache.updateCache(stepsFromRoot, iterator, isStep)
      }
    };
    this.handleStepsInserted = function(eventArgs) {
      verifyRootNode();
      stepsCache.damageCacheAfterStep(eventArgs.position)
    };
    this.handleStepsRemoved = function(eventArgs) {
      verifyRootNode();
      stepsCache.damageCacheAfterStep(eventArgs.position - 1)
    }
  };
  ops.StepsTranslator.PREVIOUS_STEP = PREVIOUS_STEP;
  ops.StepsTranslator.NEXT_STEP = NEXT_STEP;
  return ops.StepsTranslator
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
ops.OdtDocument = function OdtDocument(odfCanvas) {
  var self = this, odfUtils, domUtils, cursors = {}, members = {}, eventNotifier = new core.EventNotifier([ops.Document.signalMemberAdded, ops.Document.signalMemberUpdated, ops.Document.signalMemberRemoved, ops.Document.signalCursorAdded, ops.Document.signalCursorRemoved, ops.Document.signalCursorMoved, ops.OdtDocument.signalParagraphChanged, ops.OdtDocument.signalParagraphStyleModified, ops.OdtDocument.signalCommonStyleCreated, ops.OdtDocument.signalCommonStyleDeleted, ops.OdtDocument.signalTableAdded, 
  ops.OdtDocument.signalOperationStart, ops.OdtDocument.signalOperationEnd, ops.OdtDocument.signalProcessingBatchStart, ops.OdtDocument.signalProcessingBatchEnd, ops.OdtDocument.signalUndoStackChanged, ops.OdtDocument.signalStepsInserted, ops.OdtDocument.signalStepsRemoved]), FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT, FILTER_REJECT = core.PositionFilter.FilterResult.FILTER_REJECT, filter, stepsTranslator, lastEditingOp, unsupportedMetadataRemoved = false;
  function getRootNode() {
    var element = odfCanvas.odfContainer().getContentElement(), localName = element && element.localName;
    runtime.assert(localName === "text", "Unsupported content element type '" + localName + "' for OdtDocument");
    return element
  }
  this.getDocumentElement = function() {
    return odfCanvas.odfContainer().rootElement
  };
  this.getDOMDocument = function() {
    return(this.getDocumentElement().ownerDocument)
  };
  this.cloneDocumentElement = function() {
    var rootElement = self.getDocumentElement(), annotationViewManager = odfCanvas.getAnnotationViewManager(), initialDoc;
    if(annotationViewManager) {
      annotationViewManager.forgetAnnotations()
    }
    initialDoc = rootElement.cloneNode(true);
    odfCanvas.refreshAnnotations();
    return initialDoc
  };
  this.setDocumentElement = function(documentElement) {
    var odfContainer = odfCanvas.odfContainer();
    odfContainer.setRootElement(documentElement);
    odfCanvas.setOdfContainer(odfContainer, true);
    odfCanvas.refreshCSS()
  };
  function getDOMDocument() {
    return(self.getDocumentElement().ownerDocument)
  }
  this.getDOMDocument = getDOMDocument;
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
  function createStepIterator(container, offset, filters, subTree) {
    var positionIterator = gui.SelectionMover.createPositionIterator(subTree), filterOrChain, stepIterator;
    if(filters.length === 1) {
      filterOrChain = filters[0]
    }else {
      filterOrChain = new core.PositionFilterChain;
      filters.forEach(filterOrChain.addFilter)
    }
    stepIterator = new core.StepIterator(filterOrChain, positionIterator);
    stepIterator.setPosition(container, offset);
    return stepIterator
  }
  this.createStepIterator = createStepIterator;
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
    var point1, point2, anchorConstraint = constraint && constraint(selection.anchorNode, selection.anchorOffset), focusConstraint;
    point1 = stepsTranslator.convertDomPointToSteps(selection.anchorNode, selection.anchorOffset, anchorConstraint);
    if(!constraint && (selection.anchorNode === selection.focusNode && selection.anchorOffset === selection.focusOffset)) {
      point2 = point1
    }else {
      focusConstraint = constraint && constraint(selection.focusNode, selection.focusOffset);
      point2 = stepsTranslator.convertDomPointToSteps(selection.focusNode, selection.focusOffset, focusConstraint)
    }
    return{position:point1, length:point2 - point1}
  };
  this.convertCursorToDomRange = function(position, length) {
    var range = getDOMDocument().createRange(), point1, point2;
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
    var iterator = getIteratorAtPosition(steps), node = iterator.container(), lastTextNode, nodeOffset = 0, cursorNode = null, text;
    if(node.nodeType === Node.TEXT_NODE) {
      lastTextNode = (node);
      nodeOffset = (iterator.unfilteredDomOffset());
      if(lastTextNode.length > 0) {
        if(nodeOffset > 0) {
          lastTextNode = lastTextNode.splitText(nodeOffset)
        }
        lastTextNode.parentNode.insertBefore(getDOMDocument().createTextNode(""), lastTextNode);
        lastTextNode = (lastTextNode.previousSibling);
        nodeOffset = 0
      }
    }else {
      lastTextNode = getDOMDocument().createTextNode("");
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
          lastTextNode = getDOMDocument().createTextNode("");
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
      text = (lastTextNode.previousSibling);
      text.appendData(lastTextNode.data);
      nodeOffset = text.length;
      lastTextNode = text;
      lastTextNode.parentNode.removeChild(lastTextNode.nextSibling)
    }
    while(lastTextNode.nextSibling && lastTextNode.nextSibling.nodeType === Node.TEXT_NODE) {
      text = (lastTextNode.nextSibling);
      lastTextNode.appendData(text.data);
      lastTextNode.parentNode.removeChild(text)
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
      return odfCanvas.getFormatting().getInheritedStyleAttributes(node, false)
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
    var space = textNode.ownerDocument.createElementNS(odf.Namespaces.textns, "text:s"), container = textNode.parentNode, adjacentNode = textNode;
    space.appendChild(textNode.ownerDocument.createTextNode(" "));
    if(textNode.length === 1) {
      container.replaceChild(space, textNode)
    }else {
      textNode.deleteData(offset, 1);
      if(offset > 0) {
        if(offset < textNode.length) {
          textNode.splitText(offset)
        }
        adjacentNode = textNode.nextSibling
      }
      container.insertBefore(space, adjacentNode)
    }
    return space
  }
  function upgradeWhitespacesAtPosition(position) {
    var iterator = getIteratorAtPosition(position), container, offset, i;
    iterator.previousPosition();
    iterator.previousPosition();
    for(i = -1;i <= 1;i += 1) {
      container = iterator.container();
      offset = iterator.unfilteredDomOffset();
      if(container.nodeType === Node.TEXT_NODE && (container.data[offset] === " " && odfUtils.isSignificantWhitespace((container), offset))) {
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
    while(!odfUtils.isSpaceElement(container) && container.childNodes.item(offset)) {
      container = (container.childNodes.item(offset));
      offset = 0
    }
    if(container.nodeType === Node.TEXT_NODE) {
      container = (container.parentNode)
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
  function paragraphOrRoot(container, offset, root) {
    var node = container.childNodes.item(offset) || container, paragraph = getParagraphElement(node);
    if(paragraph && domUtils.containsNode(root, paragraph)) {
      return(paragraph)
    }
    return root
  }
  this.fixCursorPositions = function() {
    Object.keys(cursors).forEach(function(memberId) {
      var cursor = cursors[memberId], root = getRoot(cursor.getNode()), rootFilter = self.createRootFilter(root), subTree, startPoint, endPoint, selectedRange, cursorMoved = false;
      selectedRange = cursor.getSelectedRange();
      subTree = paragraphOrRoot((selectedRange.startContainer), selectedRange.startOffset, root);
      startPoint = createStepIterator((selectedRange.startContainer), selectedRange.startOffset, [filter, rootFilter], subTree);
      if(!selectedRange.collapsed) {
        subTree = paragraphOrRoot((selectedRange.endContainer), selectedRange.endOffset, root);
        endPoint = createStepIterator((selectedRange.endContainer), selectedRange.endOffset, [filter, rootFilter], subTree)
      }else {
        endPoint = startPoint
      }
      if(!startPoint.isStep() || !endPoint.isStep()) {
        cursorMoved = true;
        runtime.assert(startPoint.roundToClosestStep(), "No walkable step found for cursor owned by " + memberId);
        selectedRange.setStart(startPoint.container(), startPoint.offset());
        runtime.assert(endPoint.roundToClosestStep(), "No walkable step found for cursor owned by " + memberId);
        selectedRange.setEnd(endPoint.container(), endPoint.offset())
      }else {
        if(startPoint.container() === endPoint.container() && startPoint.offset() === endPoint.offset()) {
          if(!selectedRange.collapsed || cursor.getAnchorNode() !== cursor.getNode()) {
            cursorMoved = true;
            selectedRange.setStart(startPoint.container(), startPoint.offset());
            selectedRange.collapse(true)
          }
        }
      }
      if(cursorMoved) {
        cursor.setSelectedRange(selectedRange, cursor.hasForwardSelection());
        self.emit(ops.Document.signalCursorMoved, cursor)
      }
    })
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
  this.getCanvas = function() {
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
  this.getMemberIds = function() {
    var list = [], i;
    for(i in cursors) {
      if(cursors.hasOwnProperty(i)) {
        list.push(cursors[i].getMemberId())
      }
    }
    return list
  };
  this.addCursor = function(cursor) {
    runtime.assert(Boolean(cursor), "OdtDocument::addCursor without cursor");
    var memberid = cursor.getMemberId(), initialSelection = self.convertCursorToDomRange(0, 0);
    runtime.assert(typeof memberid === "string", "OdtDocument::addCursor has cursor without memberid");
    runtime.assert(!cursors[memberid], "OdtDocument::addCursor is adding a duplicate cursor with memberid " + memberid);
    cursor.setSelectedRange(initialSelection, true);
    cursors[memberid] = cursor
  };
  this.removeCursor = function(memberid) {
    var cursor = cursors[memberid];
    if(cursor) {
      cursor.removeFromDocument();
      delete cursors[memberid];
      self.emit(ops.Document.signalCursorRemoved, memberid);
      return true
    }
    return false
  };
  this.moveCursor = function(memberid, position, length, selectionType) {
    var cursor = cursors[memberid], selectionRange = self.convertCursorToDomRange(position, length);
    if(cursor) {
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
    eventNotifier.subscribe(ops.OdtDocument.signalOperationEnd, handleOperationExecuted)
  }
  init()
};
ops.OdtDocument.signalParagraphChanged = "paragraph/changed";
ops.OdtDocument.signalTableAdded = "table/added";
ops.OdtDocument.signalCommonStyleCreated = "style/created";
ops.OdtDocument.signalCommonStyleDeleted = "style/deleted";
ops.OdtDocument.signalParagraphStyleModified = "paragraphstyle/modified";
ops.OdtDocument.signalOperationStart = "operation/start";
ops.OdtDocument.signalOperationEnd = "operation/end";
ops.OdtDocument.signalProcessingBatchStart = "router/batchstart";
ops.OdtDocument.signalProcessingBatchEnd = "router/batchend";
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
  this.group = undefined;
  function createAnnotationNode(odtDocument, date) {
    var annotationNode, creatorNode, dateNode, listNode, listItemNode, paragraphNode;
    annotationNode = (doc.createElementNS(odf.Namespaces.officens, "office:annotation"));
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
  this.execute = function(document) {
    var odtDocument = (document), annotation, annotationEnd, cursor = odtDocument.getCursor(memberid), selectedRange, paragraphElement, domUtils = new core.DomUtils;
    doc = odtDocument.getDOMDocument();
    annotation = createAnnotationNode(odtDocument, new Date(timestamp));
    if(length) {
      annotationEnd = createAnnotationEnd();
      annotation.annotationEndElement = annotationEnd;
      insertNodeAtPosition(odtDocument, annotationEnd, position + length)
    }
    insertNodeAtPosition(odtDocument, annotation, position);
    odtDocument.emit(ops.OdtDocument.signalStepsInserted, {position:position, length:length});
    if(cursor) {
      selectedRange = doc.createRange();
      paragraphElement = domUtils.getElementsByTagNameNS(annotation, odf.Namespaces.textns, "p")[0];
      selectedRange.selectNodeContents(paragraphElement);
      cursor.setSelectedRange(selectedRange, false);
      odtDocument.emit(ops.Document.signalCursorMoved, cursor)
    }
    odtDocument.getOdfCanvas().addAnnotation(annotation);
    odtDocument.fixCursorPositions();
    return true
  };
  this.spec = function() {
    return{optype:"AddAnnotation", memberid:memberid, timestamp:timestamp, position:position, length:length, name:name}
  }
};
ops.OpAddAnnotation.Spec;
ops.OpAddAnnotation.InitSpec;
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
  this.group = undefined;
  this.execute = function(document) {
    var odtDocument = (document), cursor = odtDocument.getCursor(memberid);
    if(cursor) {
      return false
    }
    cursor = new ops.OdtCursor(memberid, odtDocument);
    odtDocument.addCursor(cursor);
    odtDocument.emit(ops.Document.signalCursorAdded, cursor);
    return true
  };
  this.spec = function() {
    return{optype:"AddCursor", memberid:memberid, timestamp:timestamp}
  }
};
ops.OpAddCursor.Spec;
ops.OpAddCursor.InitSpec;
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
ops.OpAddMember = function OpAddMember() {
  var memberid, timestamp, setProperties;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = parseInt(data.timestamp, 10);
    setProperties = data.setProperties
  };
  this.isEdit = false;
  this.group = undefined;
  this.execute = function(document) {
    var odtDocument = (document), member;
    if(odtDocument.getMember(memberid)) {
      return false
    }
    member = new ops.Member(memberid, setProperties);
    odtDocument.addMember(member);
    odtDocument.emit(ops.Document.signalMemberAdded, member);
    return true
  };
  this.spec = function() {
    return{optype:"AddMember", memberid:memberid, timestamp:timestamp, setProperties:setProperties}
  }
};
ops.OpAddMember.Spec;
ops.OpAddMember.InitSpec;
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
  this.group = undefined;
  this.execute = function(document) {
    var odtDocument = (document), odfContainer = odtDocument.getOdfCanvas().odfContainer(), formatting = odtDocument.getFormatting(), dom = odtDocument.getDOMDocument(), styleNode = dom.createElementNS(stylens, "style:style");
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
ops.OpAddStyle.InitSpec;
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
odf.TextStyleApplicator = function TextStyleApplicator(objectNameGenerator, formatting, automaticStyles) {
  var domUtils = new core.DomUtils, textns = odf.Namespaces.textns, stylens = odf.Namespaces.stylens, textProperties = "style:text-properties", webodfns = "urn:webodf:names:scope";
  function StyleLookup(info) {
    var cachedAppliedStyles = {};
    function compare(expected, actual) {
      if(typeof expected === "object" && typeof actual === "object") {
        return Object.keys(expected).every(function(key) {
          return compare(expected[key], actual[key])
        })
      }
      return expected === actual
    }
    this.isStyleApplied = function(textNode) {
      var appliedStyle = formatting.getAppliedStylesForElement(textNode, cachedAppliedStyles);
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
  this.group = undefined;
  function applyStyle(odtDocument, range, info) {
    var odfCanvas = odtDocument.getOdfCanvas(), odfContainer = odfCanvas.odfContainer(), nextTextNodes = domUtils.splitBoundaries(range), textNodes = odfUtils.getTextNodes(range, false), limits, textStyles;
    limits = {startContainer:range.startContainer, startOffset:range.startOffset, endContainer:range.endContainer, endOffset:range.endOffset};
    textStyles = new odf.TextStyleApplicator(new odf.ObjectNameGenerator((odfContainer), memberid), odtDocument.getFormatting(), odfContainer.rootElement.automaticStyles);
    textStyles.applyStyle(textNodes, limits, info);
    nextTextNodes.forEach(domUtils.normalizeTextNodes)
  }
  this.execute = function(document) {
    var odtDocument = (document), range = odtDocument.convertCursorToDomRange(position, length), impactedParagraphs = odfUtils.getParagraphElements(range);
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
ops.OpApplyDirectStyling.InitSpec;
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
ops.OpApplyHyperlink = function OpApplyHyperlink() {
  var memberid, timestamp, position, length, hyperlink, domUtils = new core.DomUtils, odfUtils = new odf.OdfUtils;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = data.position;
    length = data.length;
    hyperlink = data.hyperlink
  };
  this.isEdit = true;
  this.group = undefined;
  function createHyperlink(document, hyperlink) {
    var node = document.createElementNS(odf.Namespaces.textns, "text:a");
    node.setAttributeNS(odf.Namespaces.xlinkns, "xlink:type", "simple");
    node.setAttributeNS(odf.Namespaces.xlinkns, "xlink:href", hyperlink);
    return node
  }
  function isPartOfLink(node) {
    while(node) {
      if(odfUtils.isHyperlink(node)) {
        return true
      }
      node = node.parentNode
    }
    return false
  }
  this.execute = function(document) {
    var odtDocument = (document), ownerDocument = odtDocument.getDOMDocument(), range = odtDocument.convertCursorToDomRange(position, length), boundaryNodes = domUtils.splitBoundaries(range), modifiedParagraphs = [], textNodes = odfUtils.getTextNodes(range, false);
    if(textNodes.length === 0) {
      return false
    }
    textNodes.forEach(function(node) {
      var linkNode, paragraph = odfUtils.getParagraphElement(node);
      runtime.assert(isPartOfLink(node) === false, "The given range should not contain any link.");
      linkNode = createHyperlink(ownerDocument, hyperlink);
      node.parentNode.insertBefore(linkNode, node);
      linkNode.appendChild(node);
      if(modifiedParagraphs.indexOf(paragraph) === -1) {
        modifiedParagraphs.push(paragraph)
      }
    });
    boundaryNodes.forEach(domUtils.normalizeTextNodes);
    range.detach();
    odtDocument.getOdfCanvas().refreshSize();
    odtDocument.getOdfCanvas().rerenderAnnotations();
    modifiedParagraphs.forEach(function(paragraph) {
      odtDocument.emit(ops.OdtDocument.signalParagraphChanged, {paragraphElement:paragraph, memberId:memberid, timeStamp:timestamp})
    });
    return true
  };
  this.spec = function() {
    return{optype:"ApplyHyperlink", memberid:memberid, timestamp:timestamp, position:position, length:length, hyperlink:hyperlink}
  }
};
ops.OpApplyHyperlink.Spec;
ops.OpApplyHyperlink.InitSpec;
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
  this.group = undefined;
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
  this.execute = function(document) {
    var odtDocument = (document), odfCanvas = odtDocument.getOdfCanvas(), domPosition = odtDocument.getTextNodeAtStep(position, memberid), textNode, refNode, paragraphElement, frameElement;
    if(!domPosition) {
      return false
    }
    textNode = domPosition.textNode;
    paragraphElement = odtDocument.getParagraphElement(textNode);
    refNode = domPosition.offset !== textNode.length ? textNode.splitText(domPosition.offset) : textNode.nextSibling;
    frameElement = createFrameElement(odtDocument.getDOMDocument());
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
ops.OpInsertImage.Spec;
ops.OpInsertImage.InitSpec;
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
  this.group = undefined;
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
  this.execute = function(document) {
    var odtDocument = (document), domPosition = odtDocument.getTextNodeAtStep(position), rootNode = odtDocument.getRootNode(), previousSibling, tableNode;
    if(domPosition) {
      tableNode = createTableNode(odtDocument.getDOMDocument());
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
ops.OpInsertTable.Spec;
ops.OpInsertTable.InitSpec;
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
  var space = " ", tab = "\t", memberid, timestamp, position, moveCursor, text;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = data.position;
    text = data.text;
    moveCursor = data.moveCursor === "true" || data.moveCursor === true
  };
  this.isEdit = true;
  this.group = undefined;
  function triggerLayoutInWebkit(textNode) {
    var parent = textNode.parentNode, next = textNode.nextSibling;
    parent.removeChild(textNode);
    parent.insertBefore(textNode, next)
  }
  function requiresSpaceElement(text, index) {
    return text[index] === space && (index === 0 || (index === text.length - 1 || text[index - 1] === space))
  }
  this.execute = function(document) {
    var odtDocument = (document), domPosition, previousNode, parentElement, nextNode = null, ownerDocument = odtDocument.getDOMDocument(), paragraphElement, textns = "urn:oasis:names:tc:opendocument:xmlns:text:1.0", toInsertIndex = 0, spaceTag, spaceElement, cursor = odtDocument.getCursor(memberid), i;
    function insertTextNode(toInsertText) {
      parentElement.insertBefore(ownerDocument.createTextNode(toInsertText), nextNode)
    }
    odtDocument.upgradeWhitespacesAtPosition(position);
    domPosition = odtDocument.getTextNodeAtStep(position);
    if(domPosition) {
      previousNode = domPosition.textNode;
      nextNode = previousNode.nextSibling;
      parentElement = (previousNode.parentNode);
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
        odtDocument.emit(ops.Document.signalCursorMoved, cursor)
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
ops.OpInsertText.InitSpec;
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
  this.group = undefined;
  this.execute = function(document) {
    var odtDocument = (document), cursor = odtDocument.getCursor(memberid), selectedRange;
    if(!cursor) {
      return false
    }
    selectedRange = odtDocument.convertCursorToDomRange(position, length);
    cursor.setSelectedRange(selectedRange, length >= 0);
    cursor.setSelectionType(selectionType);
    odtDocument.emit(ops.Document.signalCursorMoved, cursor);
    return true
  };
  this.spec = function() {
    return{optype:"MoveCursor", memberid:memberid, timestamp:timestamp, position:position, length:length, selectionType:selectionType}
  }
};
ops.OpMoveCursor.Spec;
ops.OpMoveCursor.InitSpec;
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
  this.group = undefined;
  this.execute = function(document) {
    var odtDocument = (document), iterator = odtDocument.getIteratorAtPosition(position), container = iterator.container(), annotationNode, annotationEnd;
    while(!(container.namespaceURI === odf.Namespaces.officens && container.localName === "annotation")) {
      container = container.parentNode
    }
    if(container === null) {
      return false
    }
    annotationNode = (container);
    annotationEnd = annotationNode.annotationEndElement;
    odtDocument.getOdfCanvas().forgetAnnotations();
    function insert(node) {
      (annotationNode).parentNode.insertBefore(node, annotationNode)
    }
    domUtils.getElementsByTagNameNS(annotationNode, "urn:webodf:names:cursor", "cursor").forEach(insert);
    domUtils.getElementsByTagNameNS(annotationNode, "urn:webodf:names:cursor", "anchor").forEach(insert);
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
ops.OpRemoveAnnotation.Spec;
ops.OpRemoveAnnotation.InitSpec;
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
  this.group = undefined;
  this.execute = function(document) {
    var odtDocument = (document);
    odtDocument.getOdfCanvas().odfContainer().removeBlob(filename);
    return true
  };
  this.spec = function() {
    return{optype:"RemoveBlob", memberid:memberid, timestamp:timestamp, filename:filename}
  }
};
ops.OpRemoveBlob.Spec;
ops.OpRemoveBlob.InitSpec;
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
  this.group = undefined;
  this.execute = function(document) {
    var odtDocument = (document);
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
ops.OpRemoveCursor.InitSpec;
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
ops.OpRemoveHyperlink = function OpRemoveHyperlink() {
  var memberid, timestamp, position, length, domUtils = new core.DomUtils, odfUtils = new odf.OdfUtils;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = data.position;
    length = data.length
  };
  this.isEdit = true;
  this.group = undefined;
  this.execute = function(document) {
    var odtDocument = (document), range = odtDocument.convertCursorToDomRange(position, length), links = odfUtils.getHyperlinkElements(range), node;
    runtime.assert(links.length === 1, "The given range should only contain a single link.");
    node = domUtils.mergeIntoParent((links[0]));
    range.detach();
    odtDocument.getOdfCanvas().refreshSize();
    odtDocument.emit(ops.OdtDocument.signalParagraphChanged, {paragraphElement:odfUtils.getParagraphElement(node), memberId:memberid, timeStamp:timestamp});
    odtDocument.getOdfCanvas().rerenderAnnotations();
    return true
  };
  this.spec = function() {
    return{optype:"RemoveHyperlink", memberid:memberid, timestamp:timestamp, position:position, length:length}
  }
};
ops.OpRemoveHyperlink.Spec;
ops.OpRemoveHyperlink.InitSpec;
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
ops.OpRemoveMember = function OpRemoveMember() {
  var memberid, timestamp;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = parseInt(data.timestamp, 10)
  };
  this.isEdit = false;
  this.group = undefined;
  this.execute = function(document) {
    var odtDocument = (document);
    if(!odtDocument.getMember(memberid)) {
      return false
    }
    odtDocument.removeMember(memberid);
    odtDocument.emit(ops.Document.signalMemberRemoved, memberid);
    return true
  };
  this.spec = function() {
    return{optype:"RemoveMember", memberid:memberid, timestamp:timestamp}
  }
};
ops.OpRemoveMember.Spec;
ops.OpRemoveMember.InitSpec;
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
  this.group = undefined;
  this.execute = function(document) {
    var odtDocument = (document), styleNode = odtDocument.getStyleElement(styleName, styleFamily);
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
ops.OpRemoveStyle.InitSpec;
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
  this.group = undefined;
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
      if(parent && isCollapsibleContainer(parent)) {
        return mergeChildrenIntoParent(parent)
      }
      return parent
    }
    this.mergeChildrenIntoParent = mergeChildrenIntoParent
  }
  function mergeParagraphs(first, second, collapseRules) {
    var child, destination = first, source = second, secondParent, insertionPoint = null;
    if(collapseRules.isEmpty(first)) {
      if(second.parentNode !== first.parentNode) {
        secondParent = second.parentNode;
        first.parentNode.insertBefore(second, first.nextSibling)
      }
      source = first;
      destination = second;
      insertionPoint = destination.getElementsByTagNameNS(editinfons, "editinfo").item(0) || destination.firstChild
    }
    while(source.firstChild) {
      child = source.firstChild;
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
  this.execute = function(document) {
    var odtDocument = (document), paragraphElement, destinationParagraph, range, textNodes, paragraphs, cursor = odtDocument.getCursor(memberid), collapseRules = new CollapsingRules(odtDocument.getRootNode());
    odtDocument.upgradeWhitespacesAtPosition(position);
    odtDocument.upgradeWhitespacesAtPosition(position + length);
    range = odtDocument.convertCursorToDomRange(position, length);
    domUtils.splitBoundaries(range);
    paragraphElement = odtDocument.getParagraphElement(range.startContainer);
    textNodes = odfUtils.getTextElements(range, false, true);
    paragraphs = odfUtils.getParagraphElements(range);
    range.detach();
    textNodes.forEach(function(element) {
      if(element.parentNode) {
        collapseRules.mergeChildrenIntoParent(element)
      }else {
        runtime.log("WARN: text element has already been removed from it's container")
      }
    });
    function merge(destination, paragraph) {
      return mergeParagraphs(destination, paragraph, collapseRules)
    }
    destinationParagraph = paragraphs.reduce(merge);
    odtDocument.emit(ops.OdtDocument.signalStepsRemoved, {position:position, length:length});
    odtDocument.downgradeWhitespacesAtPosition(position);
    odtDocument.fixCursorPositions();
    odtDocument.getOdfCanvas().refreshSize();
    odtDocument.emit(ops.OdtDocument.signalParagraphChanged, {paragraphElement:destinationParagraph || paragraphElement, memberId:memberid, timeStamp:timestamp});
    if(cursor) {
      cursor.resetSelectionType();
      odtDocument.emit(ops.Document.signalCursorMoved, cursor)
    }
    odtDocument.getOdfCanvas().rerenderAnnotations();
    return true
  };
  this.spec = function() {
    return{optype:"RemoveText", memberid:memberid, timestamp:timestamp, position:position, length:length}
  }
};
ops.OpRemoveText.Spec;
ops.OpRemoveText.InitSpec;
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
  this.group = undefined;
  this.execute = function(document) {
    var odtDocument = (document);
    odtDocument.getOdfCanvas().odfContainer().setBlob(filename, mimetype, content);
    return true
  };
  this.spec = function() {
    return{optype:"SetBlob", memberid:memberid, timestamp:timestamp, filename:filename, mimetype:mimetype, content:content}
  }
};
ops.OpSetBlob.Spec;
ops.OpSetBlob.InitSpec;
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
  this.group = undefined;
  this.execute = function(document) {
    var odtDocument = (document), iterator, paragraphNode;
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
ops.OpSetParagraphStyle.InitSpec;
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
  this.group = undefined;
  this.execute = function(document) {
    var odtDocument = (document), domPosition, paragraphNode, targetNode, node, splitNode, splitChildNode, keptChildNode, cursor = odtDocument.getCursor(memberid);
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
      splitChildNode = splitChildNode.childNodes.item(0)
    }
    if(domPosition.textNode.length === 0) {
      domPosition.textNode.parentNode.removeChild(domPosition.textNode)
    }
    odtDocument.emit(ops.OdtDocument.signalStepsInserted, {position:position, length:1});
    if(cursor && moveCursor) {
      odtDocument.moveCursor(memberid, position + 1, 0);
      odtDocument.emit(ops.Document.signalCursorMoved, cursor)
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
ops.OpSplitParagraph.InitSpec;
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
ops.OpUpdateMember = function OpUpdateMember() {
  var memberid, timestamp, setProperties, removedProperties;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = parseInt(data.timestamp, 10);
    setProperties = data.setProperties;
    removedProperties = data.removedProperties
  };
  this.isEdit = false;
  this.group = undefined;
  function updateCreators(doc) {
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
  this.execute = function(document) {
    var odtDocument = (document), member = odtDocument.getMember(memberid);
    if(!member) {
      return false
    }
    if(removedProperties) {
      member.removeProperties(removedProperties)
    }
    if(setProperties) {
      member.setProperties(setProperties);
      if(setProperties.fullName) {
        updateCreators(odtDocument)
      }
    }
    odtDocument.emit(ops.Document.signalMemberUpdated, member);
    return true
  };
  this.spec = function() {
    return{optype:"UpdateMember", memberid:memberid, timestamp:timestamp, setProperties:setProperties, removedProperties:removedProperties}
  }
};
ops.OpUpdateMember.Spec;
ops.OpUpdateMember.InitSpec;
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
  this.group = undefined;
  this.execute = function(document) {
    var odtDocument = (document), odfContainer = odtDocument.getOdfCanvas().odfContainer(), removedPropertiesArray = [];
    if(removedProperties) {
      removedPropertiesArray = removedProperties.attributes.split(",")
    }
    odfContainer.setMetadata(setProperties, removedPropertiesArray);
    return true
  };
  this.spec = function() {
    return{optype:"UpdateMetadata", memberid:memberid, timestamp:timestamp, setProperties:setProperties, removedProperties:removedProperties}
  }
};
ops.OpUpdateMetadata.Spec;
ops.OpUpdateMetadata.InitSpec;
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
ops.OpUpdateParagraphStyle = function OpUpdateParagraphStyle() {
  var memberid, timestamp, styleName, setProperties, removedProperties, paragraphPropertiesName = "style:paragraph-properties", textPropertiesName = "style:text-properties", stylens = odf.Namespaces.stylens;
  function removedAttributesFromStyleNode(node, removedAttributeNames) {
    var i, attributeNameParts, attributeNameList = removedAttributeNames ? removedAttributeNames.split(",") : [];
    for(i = 0;i < attributeNameList.length;i += 1) {
      attributeNameParts = attributeNameList[i].split(":");
      node.removeAttributeNS((odf.Namespaces.lookupNamespaceURI(attributeNameParts[0])), attributeNameParts[1])
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
  this.group = undefined;
  this.execute = function(document) {
    var odtDocument = (document), formatting = odtDocument.getFormatting(), styleNode, object, paragraphPropertiesNode, textPropertiesNode;
    if(styleName !== "") {
      styleNode = odtDocument.getParagraphStyleElement(styleName)
    }else {
      styleNode = formatting.getDefaultStyleElement("paragraph")
    }
    if(styleNode) {
      paragraphPropertiesNode = (styleNode.getElementsByTagNameNS(stylens, "paragraph-properties").item(0));
      textPropertiesNode = (styleNode.getElementsByTagNameNS(stylens, "text-properties").item(0));
      if(setProperties) {
        formatting.updateStyle(styleNode, setProperties)
      }
      if(removedProperties) {
        object = (removedProperties[paragraphPropertiesName]);
        if(paragraphPropertiesNode && object) {
          removedAttributesFromStyleNode(paragraphPropertiesNode, object.attributes);
          if(paragraphPropertiesNode.attributes.length === 0) {
            styleNode.removeChild(paragraphPropertiesNode)
          }
        }
        object = (removedProperties[textPropertiesName]);
        if(textPropertiesNode && object) {
          removedAttributesFromStyleNode(textPropertiesNode, object.attributes);
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
ops.OpUpdateParagraphStyle.InitSpec;
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
ops.OperationFactory = function OperationFactory() {
  var specs;
  this.register = function(specName, specConstructor) {
    specs[specName] = specConstructor
  };
  this.create = function(spec) {
    var op = null, Constructor = specs[spec.optype];
    if(Constructor) {
      op = new Constructor;
      op.init(spec)
    }
    return op
  };
  function init() {
    specs = {AddMember:ops.OpAddMember, UpdateMember:ops.OpUpdateMember, RemoveMember:ops.OpRemoveMember, AddCursor:ops.OpAddCursor, ApplyDirectStyling:ops.OpApplyDirectStyling, SetBlob:ops.OpSetBlob, RemoveBlob:ops.OpRemoveBlob, InsertImage:ops.OpInsertImage, InsertTable:ops.OpInsertTable, InsertText:ops.OpInsertText, RemoveText:ops.OpRemoveText, SplitParagraph:ops.OpSplitParagraph, SetParagraphStyle:ops.OpSetParagraphStyle, UpdateParagraphStyle:ops.OpUpdateParagraphStyle, AddStyle:ops.OpAddStyle, 
    RemoveStyle:ops.OpRemoveStyle, MoveCursor:ops.OpMoveCursor, RemoveCursor:ops.OpRemoveCursor, AddAnnotation:ops.OpAddAnnotation, RemoveAnnotation:ops.OpRemoveAnnotation, UpdateMetadata:ops.OpUpdateMetadata, ApplyHyperlink:ops.OpApplyHyperlink, RemoveHyperlink:ops.OpRemoveHyperlink}
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
ops.OperationRouter.signalProcessingBatchStart = "router/batchstart";
ops.OperationRouter.signalProcessingBatchEnd = "router/batchend";
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
  var events = new core.EventNotifier([ops.OperationRouter.signalProcessingBatchStart, ops.OperationRouter.signalProcessingBatchEnd]), operationFactory, playbackFunction, groupIdentifier = 0;
  this.setOperationFactory = function(f) {
    operationFactory = f
  };
  this.setPlaybackFunction = function(playback_func) {
    playbackFunction = playback_func
  };
  this.push = function(operations) {
    groupIdentifier += 1;
    events.emit(ops.OperationRouter.signalProcessingBatchStart, {});
    operations.forEach(function(op) {
      var timedOp, opspec = op.spec();
      opspec.timestamp = (new Date).getTime();
      timedOp = operationFactory.create(opspec);
      timedOp.group = "g" + groupIdentifier;
      playbackFunction(timedOp)
    });
    events.emit(ops.OperationRouter.signalProcessingBatchEnd, {})
  };
  this.close = function(cb) {
    cb()
  };
  this.subscribe = function(eventId, cb) {
    events.subscribe(eventId, cb)
  };
  this.unsubscribe = function(eventId, cb) {
    events.unsubscribe(eventId, cb)
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
ops.Session = function Session(odfCanvas) {
  var self = this, operationFactory = new ops.OperationFactory, odtDocument = new ops.OdtDocument(odfCanvas), operationRouter = null;
  function forwardBatchStart(args) {
    odtDocument.emit(ops.OdtDocument.signalProcessingBatchStart, args)
  }
  function forwardBatchEnd(args) {
    odtDocument.emit(ops.OdtDocument.signalProcessingBatchEnd, args)
  }
  this.setOperationFactory = function(opFactory) {
    operationFactory = opFactory;
    if(operationRouter) {
      operationRouter.setOperationFactory(operationFactory)
    }
  };
  this.setOperationRouter = function(opRouter) {
    if(operationRouter) {
      operationRouter.unsubscribe(ops.OperationRouter.signalProcessingBatchStart, forwardBatchStart);
      operationRouter.unsubscribe(ops.OperationRouter.signalProcessingBatchEnd, forwardBatchEnd)
    }
    operationRouter = opRouter;
    operationRouter.subscribe(ops.OperationRouter.signalProcessingBatchStart, forwardBatchStart);
    operationRouter.subscribe(ops.OperationRouter.signalProcessingBatchEnd, forwardBatchEnd);
    opRouter.setPlaybackFunction(function(op) {
      odtDocument.emit(ops.OdtDocument.signalOperationStart, op);
      if(op.execute(odtDocument)) {
        odtDocument.emit(ops.OdtDocument.signalOperationEnd, op);
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
    odtDocument.unsubscribe(ops.Document.signalCursorAdded, onCursorAdded);
    odtDocument.unsubscribe(ops.Document.signalCursorRemoved, onCursorRemoved);
    odtDocument.unsubscribe(ops.Document.signalCursorMoved, onCursorMoved);
    callback()
  };
  function init() {
    odtDocument.subscribe(ops.Document.signalCursorAdded, onCursorAdded);
    odtDocument.subscribe(ops.Document.signalCursorRemoved, onCursorRemoved);
    odtDocument.subscribe(ops.Document.signalCursorMoved, onCursorMoved);
    updatedCachedValues()
  }
  init()
};
gui.AnnotationController.annotatableChanged = "annotatable/changed";
(function() {
  return gui.AnnotationController
})();
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
    if(isFocussed) {
      handle.classList.add("active")
    }else {
      handle.classList.remove("active")
    }
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
    handle.className = "handle";
    parentElement.appendChild(handle)
  }
  init()
};
gui.Caret = function Caret(cursor, avatarInitiallyVisible, blinkOnRangeSelect) {
  var MIN_CARET_HEIGHT_PX = 8, DEFAULT_CARET_TOP = "5%", DEFAULT_CARET_HEIGHT = "1em", BLINK_PERIOD_MS = 500, span, avatar, cursorNode, overlayElement, domUtils = new core.DomUtils, async = new core.Async, redrawTask, blinkTask, shouldResetBlink = false, shouldCheckCaretVisibility = false, shouldUpdateCaretSize = false, state = {isFocused:false, isShown:true, visibility:"hidden"}, lastState = {isFocused:!state.isFocused, isShown:!state.isShown, visibility:"hidden"};
  function blinkCaret() {
    span.style.opacity = span.style.opacity === "0" ? "1" : "0";
    blinkTask.trigger()
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
  function updateCaretHeightAndPosition() {
    var selectionRect = getSelectionRect(), canvas = (cursor.getDocument().getCanvas()), zoomLevel = canvas.getZoomLevel(), rootRect = domUtils.getBoundingClientRect(canvas.getSizer()), caretRect, caretStyle;
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
    if(overlayElement) {
      caretStyle = runtime.getWindow().getComputedStyle(span, null);
      caretRect = domUtils.getBoundingClientRect(span);
      overlayElement.style.bottom = domUtils.adaptRangeDifferenceToZoomLevel(rootRect.bottom - caretRect.bottom, zoomLevel) + "px";
      overlayElement.style.left = domUtils.adaptRangeDifferenceToZoomLevel(caretRect.right - rootRect.left, zoomLevel) + "px";
      if(caretStyle.font) {
        overlayElement.style.font = caretStyle.font
      }else {
        overlayElement.style.fontStyle = caretStyle.fontStyle;
        overlayElement.style.fontVariant = caretStyle.fontVariant;
        overlayElement.style.fontWeight = caretStyle.fontWeight;
        overlayElement.style.fontSize = caretStyle.fontSize;
        overlayElement.style.lineHeight = caretStyle.lineHeight;
        overlayElement.style.fontFamily = caretStyle.fontFamily
      }
    }
  }
  function ensureVisible() {
    var canvasElement = cursor.getDocument().getCanvas().getElement(), canvasContainerElement = (canvasElement.parentNode), caretRect, canvasContainerRect, horizontalMargin = canvasContainerElement.offsetWidth - canvasContainerElement.clientWidth + 5, verticalMargin = canvasContainerElement.offsetHeight - canvasContainerElement.clientHeight + 5;
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
  }
  function hasStateChanged(property) {
    return lastState[property] !== state[property]
  }
  function saveState() {
    Object.keys(state).forEach(function(key) {
      lastState[key] = state[key]
    })
  }
  function updateCaret() {
    if(state.isShown === false || (cursor.getSelectionType() !== ops.OdtCursor.RangeSelection || !blinkOnRangeSelect && !cursor.getSelectedRange().collapsed)) {
      state.visibility = "hidden";
      span.style.visibility = "hidden";
      blinkTask.cancel()
    }else {
      state.visibility = "visible";
      span.style.visibility = "visible";
      if(state.isFocused === false) {
        span.style.opacity = "1";
        blinkTask.cancel()
      }else {
        if(shouldResetBlink || hasStateChanged("visibility")) {
          span.style.opacity = "1";
          blinkTask.cancel()
        }
        blinkTask.trigger()
      }
      if(shouldUpdateCaretSize || (shouldCheckCaretVisibility || hasStateChanged("visibility"))) {
        updateCaretHeightAndPosition()
      }
      if(shouldCheckCaretVisibility) {
        ensureVisible()
      }
    }
    if(hasStateChanged("isFocused")) {
      avatar.markAsFocussed(state.isFocused)
    }
    saveState();
    shouldResetBlink = false;
    shouldCheckCaretVisibility = false;
    shouldUpdateCaretSize = false
  }
  this.handleUpdate = function() {
    shouldUpdateCaretSize = true;
    if(state.visibility !== "hidden") {
      state.visibility = "hidden";
      span.style.visibility = "hidden"
    }
    redrawTask.trigger()
  };
  this.refreshCursorBlinking = function() {
    shouldResetBlink = true;
    redrawTask.trigger()
  };
  this.setFocus = function() {
    state.isFocused = true;
    redrawTask.trigger()
  };
  this.removeFocus = function() {
    state.isFocused = false;
    redrawTask.trigger()
  };
  this.show = function() {
    state.isShown = true;
    redrawTask.trigger()
  };
  this.hide = function() {
    state.isShown = false;
    redrawTask.trigger()
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
  this.setOverlayElement = function(element) {
    overlayElement = element;
    shouldUpdateCaretSize = true;
    redrawTask.trigger()
  };
  this.ensureVisible = function() {
    shouldCheckCaretVisibility = true;
    redrawTask.trigger()
  };
  function destroy(callback) {
    cursorNode.removeChild(span);
    callback()
  }
  this.destroy = function(callback) {
    var cleanup = [redrawTask.destroy, blinkTask.destroy, avatar.destroy, destroy];
    async.destroyAll(cleanup, callback)
  };
  function init() {
    var dom = cursor.getDocument().getDOMDocument(), htmlns = dom.documentElement.namespaceURI;
    span = (dom.createElementNS(htmlns, "span"));
    span.className = "caret";
    span.style.top = DEFAULT_CARET_TOP;
    cursorNode = cursor.getNode();
    cursorNode.appendChild(span);
    avatar = new gui.Avatar(cursorNode, avatarInitiallyVisible);
    redrawTask = new core.ScheduledTask(updateCaret, 0);
    blinkTask = new core.ScheduledTask(blinkCaret, BLINK_PERIOD_MS);
    redrawTask.triggerImmediate()
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
odf.TextSerializer = function TextSerializer() {
  var self = this, odfUtils = new odf.OdfUtils;
  function serializeNode(node) {
    var s = "", accept = self.filter ? self.filter.acceptNode(node) : NodeFilter.FILTER_ACCEPT, nodeType = node.nodeType, child;
    if((accept === NodeFilter.FILTER_ACCEPT || accept === NodeFilter.FILTER_SKIP) && odfUtils.isTextContentContainingNode(node)) {
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
gui.MimeDataExporter = function MimeDataExporter() {
  var textSerializer, filter;
  this.exportRangeToDataTransfer = function(dataTransfer, range) {
    var document = range.startContainer.ownerDocument, serializedFragment, fragmentContainer;
    fragmentContainer = document.createElement("span");
    fragmentContainer.appendChild(range.cloneContents());
    serializedFragment = textSerializer.writeToString(fragmentContainer);
    try {
      dataTransfer.setData("text/plain", serializedFragment)
    }catch(e) {
      dataTransfer.setData("Text", serializedFragment)
    }
  };
  function init() {
    textSerializer = new odf.TextSerializer;
    filter = new odf.OdfNodeFilter;
    textSerializer.filter = filter
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
gui.Clipboard = function Clipboard(mimeDataExporter) {
  this.setDataFromRange = function(e, range) {
    var result, clipboard = e.clipboardData, window = runtime.getWindow();
    if(!clipboard && window) {
      clipboard = window.clipboardData
    }
    if(clipboard) {
      result = true;
      mimeDataExporter.exportRangeToDataTransfer((clipboard), range);
      e.preventDefault()
    }else {
      result = false
    }
    return result
  }
};
/*

 Copyright (C) 2012-2014 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.StyleSummary = function StyleSummary(styles) {
  var propertyValues = {};
  function getPropertyValues(section, propertyName) {
    var cacheKey = section + "|" + propertyName, values;
    if(!propertyValues.hasOwnProperty(cacheKey)) {
      values = [];
      styles.forEach(function(style) {
        var styleSection = style[section], value = styleSection && styleSection[propertyName];
        if(values.indexOf(value) === -1) {
          values.push(value)
        }
      });
      propertyValues[cacheKey] = values
    }
    return propertyValues[cacheKey]
  }
  this.getPropertyValues = getPropertyValues;
  function lazilyLoaded(section, propertyName, acceptedPropertyValues) {
    return function() {
      var existingPropertyValues = getPropertyValues(section, propertyName);
      return acceptedPropertyValues.length >= existingPropertyValues.length && existingPropertyValues.every(function(v) {
        return acceptedPropertyValues.indexOf(v) !== -1
      })
    }
  }
  function getCommonValue(section, propertyName) {
    var values = getPropertyValues(section, propertyName);
    return values.length === 1 ? values[0] : undefined
  }
  this.getCommonValue = getCommonValue;
  this.isBold = lazilyLoaded("style:text-properties", "fo:font-weight", ["bold"]);
  this.isItalic = lazilyLoaded("style:text-properties", "fo:font-style", ["italic"]);
  this.hasUnderline = lazilyLoaded("style:text-properties", "style:text-underline-style", ["solid"]);
  this.hasStrikeThrough = lazilyLoaded("style:text-properties", "style:text-line-through-style", ["solid"]);
  this.fontSize = function() {
    var stringFontSize = getCommonValue("style:text-properties", "fo:font-size");
    return(stringFontSize && parseFloat(stringFontSize))
  };
  this.fontName = function() {
    return getCommonValue("style:text-properties", "style:font-name")
  };
  this.isAlignedLeft = lazilyLoaded("style:paragraph-properties", "fo:text-align", ["left", "start"]);
  this.isAlignedCenter = lazilyLoaded("style:paragraph-properties", "fo:text-align", ["center"]);
  this.isAlignedRight = lazilyLoaded("style:paragraph-properties", "fo:text-align", ["right", "end"]);
  this.isAlignedJustified = lazilyLoaded("style:paragraph-properties", "fo:text-align", ["justify"]);
  this.text = {isBold:this.isBold, isItalic:this.isItalic, hasUnderline:this.hasUnderline, hasStrikeThrough:this.hasStrikeThrough, fontSize:this.fontSize, fontName:this.fontName};
  this.paragraph = {isAlignedLeft:this.isAlignedLeft, isAlignedCenter:this.isAlignedCenter, isAlignedRight:this.isAlignedRight, isAlignedJustified:this.isAlignedJustified}
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
gui.DirectFormattingController = function DirectFormattingController(session, inputMemberId, objectNameGenerator, directParagraphStylingEnabled) {
  var self = this, odtDocument = session.getOdtDocument(), utils = new core.Utils, odfUtils = new odf.OdfUtils, eventNotifier = new core.EventNotifier([gui.DirectFormattingController.textStylingChanged, gui.DirectFormattingController.paragraphStylingChanged]), textns = odf.Namespaces.textns, FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT, directCursorStyleProperties, selectionAppliedStyles = [], selectionStylesSummary = new gui.StyleSummary(selectionAppliedStyles);
  function getNodes(range) {
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
    return nodes
  }
  function getSelectionAppliedStyles() {
    var cursor = odtDocument.getCursor(inputMemberId), range = cursor && cursor.getSelectedRange(), nodes = range ? getNodes(range) : [], selectionStyles = odtDocument.getFormatting().getAppliedStyles(nodes);
    if(selectionStyles[0] && directCursorStyleProperties) {
      selectionStyles[0] = utils.mergeObjects(selectionStyles[0], (directCursorStyleProperties))
    }
    return selectionStyles
  }
  function createDiff(oldSummary, newSummary) {
    var diffMap = {};
    Object.keys(oldSummary).forEach(function(funcName) {
      var oldValue = oldSummary[funcName](), newValue = newSummary[funcName]();
      if(oldValue !== newValue) {
        diffMap[funcName] = newValue
      }
    });
    return diffMap
  }
  function updateSelectionStylesInfo() {
    var textStyleDiff, paragraphStyleDiff, newSelectionStylesSummary;
    selectionAppliedStyles = getSelectionAppliedStyles();
    newSelectionStylesSummary = new gui.StyleSummary(selectionAppliedStyles);
    textStyleDiff = createDiff(selectionStylesSummary.text, newSelectionStylesSummary.text);
    paragraphStyleDiff = createDiff(selectionStylesSummary.paragraph, newSelectionStylesSummary.paragraph);
    selectionStylesSummary = newSelectionStylesSummary;
    if(Object.keys(textStyleDiff).length > 0) {
      eventNotifier.emit(gui.DirectFormattingController.textStylingChanged, textStyleDiff)
    }
    if(Object.keys(paragraphStyleDiff).length > 0) {
      eventNotifier.emit(gui.DirectFormattingController.paragraphStylingChanged, paragraphStyleDiff)
    }
  }
  function onCursorEvent(cursorOrId) {
    var cursorMemberId = typeof cursorOrId === "string" ? cursorOrId : cursorOrId.getMemberId();
    if(cursorMemberId === inputMemberId) {
      updateSelectionStylesInfo()
    }
  }
  function onParagraphStyleModified() {
    updateSelectionStylesInfo()
  }
  function onParagraphChanged(args) {
    var cursor = odtDocument.getCursor(inputMemberId), p = args.paragraphElement;
    if(cursor && odtDocument.getParagraphElement(cursor.getNode()) === p) {
      updateSelectionStylesInfo()
    }
  }
  function toggle(predicate, toggleMethod) {
    toggleMethod(!predicate());
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
      updateSelectionStylesInfo()
    }
  }
  this.formatTextSelection = formatTextSelection;
  function applyTextPropertyToSelection(propertyName, propertyValue) {
    var textProperties = {};
    textProperties[propertyName] = propertyValue;
    formatTextSelection(textProperties)
  }
  this.createCursorStyleOp = function(position, length, useCachedStyle) {
    var styleOp = null, properties = useCachedStyle ? selectionAppliedStyles[0] : directCursorStyleProperties;
    if(properties && properties["style:text-properties"]) {
      styleOp = new ops.OpApplyDirectStyling;
      styleOp.init({memberid:inputMemberId, position:position, length:length, setProperties:{"style:text-properties":properties["style:text-properties"]}});
      directCursorStyleProperties = null;
      updateSelectionStylesInfo()
    }
    return styleOp
  };
  function clearCursorStyle(op) {
    var spec = op.spec();
    if(directCursorStyleProperties && spec.memberid === inputMemberId) {
      if(spec.optype !== "SplitParagraph") {
        directCursorStyleProperties = null;
        updateSelectionStylesInfo()
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
    return selectionAppliedStyles
  };
  this.toggleBold = toggle.bind(self, function() {
    return selectionStylesSummary.isBold()
  }, setBold);
  this.toggleItalic = toggle.bind(self, function() {
    return selectionStylesSummary.isItalic()
  }, setItalic);
  this.toggleUnderline = toggle.bind(self, function() {
    return selectionStylesSummary.hasUnderline()
  }, setHasUnderline);
  this.toggleStrikethrough = toggle.bind(self, function() {
    return selectionStylesSummary.hasStrikeThrough()
  }, setHasStrikethrough);
  this.isBold = function() {
    return selectionStylesSummary.isBold()
  };
  this.isItalic = function() {
    return selectionStylesSummary.isItalic()
  };
  this.hasUnderline = function() {
    return selectionStylesSummary.hasUnderline()
  };
  this.hasStrikeThrough = function() {
    return selectionStylesSummary.hasStrikeThrough()
  };
  this.fontSize = function() {
    return selectionStylesSummary.fontSize()
  };
  this.fontName = function() {
    return selectionStylesSummary.fontName()
  };
  this.isAlignedLeft = function() {
    return selectionStylesSummary.isAlignedLeft()
  };
  this.isAlignedCenter = function() {
    return selectionStylesSummary.isAlignedCenter()
  };
  this.isAlignedRight = function() {
    return selectionStylesSummary.isAlignedRight()
  };
  this.isAlignedJustified = function() {
    return selectionStylesSummary.isAlignedJustified()
  };
  function roundUp(step) {
    return step === ops.StepsTranslator.NEXT_STEP
  }
  function getOwnProperty(obj, key) {
    return obj.hasOwnProperty(key) ? obj[key] : undefined
  }
  function applyParagraphDirectStyling(applyDirectStyling) {
    var range = odtDocument.getCursor(inputMemberId).getSelectedRange(), paragraphs = odfUtils.getParagraphElements(range), formatting = odtDocument.getFormatting(), operations = [], derivedStyleNames = {}, defaultStyleName;
    paragraphs.forEach(function(paragraph) {
      var paragraphStartPoint = odtDocument.convertDomPointToCursorStep(paragraph, 0, roundUp), paragraphStyleName = paragraph.getAttributeNS(odf.Namespaces.textns, "style-name"), newParagraphStyleName, opAddStyle, opSetParagraphStyle, paragraphProperties;
      if(paragraphStyleName) {
        newParagraphStyleName = getOwnProperty(derivedStyleNames, paragraphStyleName)
      }else {
        newParagraphStyleName = defaultStyleName
      }
      if(!newParagraphStyleName) {
        newParagraphStyleName = objectNameGenerator.generateStyleName();
        if(paragraphStyleName) {
          derivedStyleNames[paragraphStyleName] = newParagraphStyleName;
          paragraphProperties = formatting.createDerivedStyleObject(paragraphStyleName, "paragraph", {})
        }else {
          defaultStyleName = newParagraphStyleName;
          paragraphProperties = {}
        }
        paragraphProperties = applyDirectStyling(paragraphProperties);
        opAddStyle = new ops.OpAddStyle;
        opAddStyle.init({memberid:inputMemberId, styleName:newParagraphStyleName.toString(), styleFamily:"paragraph", isAutomaticStyle:true, setProperties:paragraphProperties});
        operations.push(opAddStyle)
      }
      opSetParagraphStyle = new ops.OpSetParagraphStyle;
      opSetParagraphStyle.init({memberid:inputMemberId, styleName:newParagraphStyleName.toString(), position:paragraphStartPoint});
      operations.push(opSetParagraphStyle)
    });
    session.enqueue(operations)
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
    var tabStopDistance = odtDocument.getFormatting().getDefaultTabStopDistance(), paragraphProperties = paragraphStyle["style:paragraph-properties"], indentValue, indent, newIndent;
    if(paragraphProperties) {
      indentValue = paragraphProperties["fo:margin-left"];
      if(indentValue) {
        indent = odfUtils.parseLength(indentValue)
      }
    }
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
  function isSelectionAtTheEndOfLastParagraph(range, paragraphNode) {
    var iterator = gui.SelectionMover.createPositionIterator(paragraphNode), rootConstrainedFilter = new core.PositionFilterChain;
    rootConstrainedFilter.addFilter(odtDocument.getPositionFilter());
    rootConstrainedFilter.addFilter(odtDocument.createRootFilter(inputMemberId));
    iterator.setUnfilteredPosition((range.endContainer), range.endOffset);
    while(iterator.nextPosition()) {
      if(rootConstrainedFilter.acceptPosition(iterator) === FILTER_ACCEPT) {
        return odtDocument.getParagraphElement(iterator.getCurrentNode()) !== paragraphNode
      }
    }
    return true
  }
  function isTextStyleDifferentFromFirstParagraph(range, paragraphNode) {
    var textNodes = getNodes(range), textStyle = odtDocument.getFormatting().getAppliedStyles(textNodes)[0], paragraphStyle = odtDocument.getFormatting().getAppliedStylesForElement(paragraphNode);
    if(!textStyle || (textStyle["style:family"] !== "text" || !textStyle["style:text-properties"])) {
      return false
    }
    if(!paragraphStyle || !paragraphStyle["style:text-properties"]) {
      return true
    }
    textStyle = (textStyle["style:text-properties"]);
    paragraphStyle = (paragraphStyle["style:text-properties"]);
    return!Object.keys(textStyle).every(function(key) {
      return textStyle[key] === paragraphStyle[key]
    })
  }
  this.createParagraphStyleOps = function(position) {
    var cursor = odtDocument.getCursor(inputMemberId), range = cursor.getSelectedRange(), operations = [], op, startNode, endNode, paragraphNode, properties, parentStyleName, styleName;
    if(cursor.hasForwardSelection()) {
      startNode = cursor.getAnchorNode();
      endNode = cursor.getNode()
    }else {
      startNode = cursor.getNode();
      endNode = cursor.getAnchorNode()
    }
    paragraphNode = (odtDocument.getParagraphElement(endNode));
    runtime.assert(Boolean(paragraphNode), "DirectFormattingController: Cursor outside paragraph");
    if(!isSelectionAtTheEndOfLastParagraph(range, paragraphNode)) {
      return operations
    }
    if(endNode !== startNode) {
      paragraphNode = (odtDocument.getParagraphElement(startNode))
    }
    if(!directCursorStyleProperties && !isTextStyleDifferentFromFirstParagraph(range, paragraphNode)) {
      return operations
    }
    properties = selectionAppliedStyles[0];
    if(!properties) {
      return operations
    }
    parentStyleName = paragraphNode.getAttributeNS(textns, "style-name");
    if(parentStyleName) {
      properties = {"style:text-properties":properties["style:text-properties"]};
      properties = odtDocument.getFormatting().createDerivedStyleObject(parentStyleName, "paragraph", properties)
    }
    styleName = objectNameGenerator.generateStyleName();
    op = new ops.OpAddStyle;
    op.init({memberid:inputMemberId, styleName:styleName, styleFamily:"paragraph", isAutomaticStyle:true, setProperties:properties});
    operations.push(op);
    op = new ops.OpSetParagraphStyle;
    op.init({memberid:inputMemberId, styleName:styleName, position:position});
    operations.push(op);
    return operations
  };
  this.subscribe = function(eventid, cb) {
    eventNotifier.subscribe(eventid, cb)
  };
  this.unsubscribe = function(eventid, cb) {
    eventNotifier.unsubscribe(eventid, cb)
  };
  this.destroy = function(callback) {
    odtDocument.unsubscribe(ops.Document.signalCursorAdded, onCursorEvent);
    odtDocument.unsubscribe(ops.Document.signalCursorRemoved, onCursorEvent);
    odtDocument.unsubscribe(ops.Document.signalCursorMoved, onCursorEvent);
    odtDocument.unsubscribe(ops.OdtDocument.signalParagraphStyleModified, onParagraphStyleModified);
    odtDocument.unsubscribe(ops.OdtDocument.signalParagraphChanged, onParagraphChanged);
    odtDocument.unsubscribe(ops.OdtDocument.signalOperationEnd, clearCursorStyle);
    callback()
  };
  function emptyFunction() {
  }
  function init() {
    odtDocument.subscribe(ops.Document.signalCursorAdded, onCursorEvent);
    odtDocument.subscribe(ops.Document.signalCursorRemoved, onCursorEvent);
    odtDocument.subscribe(ops.Document.signalCursorMoved, onCursorEvent);
    odtDocument.subscribe(ops.OdtDocument.signalParagraphStyleModified, onParagraphStyleModified);
    odtDocument.subscribe(ops.OdtDocument.signalParagraphChanged, onParagraphChanged);
    odtDocument.subscribe(ops.OdtDocument.signalOperationEnd, clearCursorStyle);
    updateSelectionStylesInfo();
    if(!directParagraphStylingEnabled) {
      self.alignParagraphCenter = emptyFunction;
      self.alignParagraphJustified = emptyFunction;
      self.alignParagraphLeft = emptyFunction;
      self.alignParagraphRight = emptyFunction;
      self.createParagraphStyleOps = function() {
        return[]
      };
      self.indent = emptyFunction;
      self.outdent = emptyFunction
    }
  }
  init()
};
gui.DirectFormattingController.textStylingChanged = "textStyling/changed";
gui.DirectFormattingController.paragraphStylingChanged = "paragraphStyling/changed";
(function() {
  return gui.DirectFormattingController
})();
gui.HyperlinkClickHandler = function HyperlinkClickHandler(getRootNode) {
  var webodfns = "urn:webodf:names:helper", links = "links", inactive = "inactive", None = gui.HyperlinkClickHandler.Modifier.None, Ctrl = gui.HyperlinkClickHandler.Modifier.Ctrl, Meta = gui.HyperlinkClickHandler.Modifier.Meta, odfUtils = new odf.OdfUtils, xpath = xmldom.XPath, modifier = None;
  function getHyperlinkElement(node) {
    while(node !== null) {
      if(odfUtils.isHyperlink(node)) {
        return(node)
      }
      if(odfUtils.isParagraph(node)) {
        break
      }
      node = node.parentNode
    }
    return null
  }
  this.handleClick = function(e) {
    var target = e.target || e.srcElement, modifierPressed, linkElement, url, rootNode, bookmarks;
    if(e.ctrlKey) {
      modifierPressed = Ctrl
    }else {
      if(e.metaKey) {
        modifierPressed = Meta
      }
    }
    if(modifier !== None && modifier !== modifierPressed) {
      return
    }
    linkElement = getHyperlinkElement((target));
    if(!linkElement) {
      return
    }
    url = odfUtils.getHyperlinkTarget(linkElement);
    if(url === "") {
      return
    }
    if(url[0] === "#") {
      url = url.substring(1);
      rootNode = (getRootNode());
      bookmarks = xpath.getODFElementsWithXPath(rootNode, "//text:bookmark-start[@text:name='" + url + "']", odf.Namespaces.lookupNamespaceURI);
      if(bookmarks.length === 0) {
        bookmarks = xpath.getODFElementsWithXPath(rootNode, "//text:bookmark[@text:name='" + url + "']", odf.Namespaces.lookupNamespaceURI)
      }
      if(bookmarks.length > 0) {
        bookmarks[0].scrollIntoView(true)
      }
    }else {
      runtime.getWindow().open(url)
    }
    if(e.preventDefault) {
      e.preventDefault()
    }else {
      e.returnValue = false
    }
  };
  function showPointerCursor() {
    getRootNode().removeAttributeNS(webodfns, links)
  }
  this.showPointerCursor = showPointerCursor;
  function showTextCursor() {
    getRootNode().setAttributeNS(webodfns, links, inactive)
  }
  this.showTextCursor = showTextCursor;
  this.setModifier = function(value) {
    modifier = value;
    if(modifier !== None) {
      showTextCursor()
    }else {
      showPointerCursor()
    }
  }
};
gui.HyperlinkClickHandler.Modifier = {None:0, Ctrl:1, Meta:2};
gui.HyperlinkController = function HyperlinkController(session, inputMemberId) {
  var odfUtils = new odf.OdfUtils, odtDocument = session.getOdtDocument();
  function addHyperlink(hyperlink, insertionText) {
    var selection = odtDocument.getCursorSelection(inputMemberId), op = new ops.OpApplyHyperlink, operations = [];
    if(selection.length === 0 || insertionText) {
      insertionText = insertionText || hyperlink;
      op = new ops.OpInsertText;
      op.init({memberid:inputMemberId, position:selection.position, text:insertionText});
      selection.length = insertionText.length;
      operations.push(op)
    }
    op = new ops.OpApplyHyperlink;
    op.init({memberid:inputMemberId, position:selection.position, length:selection.length, hyperlink:hyperlink});
    operations.push(op);
    session.enqueue(operations)
  }
  this.addHyperlink = addHyperlink;
  function removeHyperlinks() {
    var iterator = gui.SelectionMover.createPositionIterator(odtDocument.getRootNode()), selectedRange = odtDocument.getCursor(inputMemberId).getSelectedRange(), links = odfUtils.getHyperlinkElements(selectedRange), removeEntireLink = selectedRange.collapsed && links.length === 1, domRange = odtDocument.getDOMDocument().createRange(), operations = [], cursorRange, firstLink, lastLink, offset, op;
    if(links.length === 0) {
      return
    }
    links.forEach(function(link) {
      domRange.selectNodeContents(link);
      cursorRange = odtDocument.convertDomToCursorRange({anchorNode:(domRange.startContainer), anchorOffset:domRange.startOffset, focusNode:(domRange.endContainer), focusOffset:domRange.endOffset});
      op = new ops.OpRemoveHyperlink;
      op.init({memberid:inputMemberId, position:cursorRange.position, length:cursorRange.length});
      operations.push(op)
    });
    if(!removeEntireLink) {
      firstLink = (links[0]);
      if(selectedRange.comparePoint(firstLink, 0) === -1) {
        domRange.setStart(firstLink, 0);
        domRange.setEnd(selectedRange.startContainer, selectedRange.startOffset);
        cursorRange = odtDocument.convertDomToCursorRange({anchorNode:(domRange.startContainer), anchorOffset:domRange.startOffset, focusNode:(domRange.endContainer), focusOffset:domRange.endOffset});
        if(cursorRange.length > 0) {
          op = new ops.OpApplyHyperlink;
          (op).init({memberid:inputMemberId, position:cursorRange.position, length:cursorRange.length, hyperlink:odfUtils.getHyperlinkTarget(firstLink)});
          operations.push(op)
        }
      }
      lastLink = (links[links.length - 1]);
      iterator.moveToEndOfNode(lastLink);
      offset = iterator.unfilteredDomOffset();
      if(selectedRange.comparePoint(lastLink, offset) === 1) {
        domRange.setStart(selectedRange.endContainer, selectedRange.endOffset);
        domRange.setEnd(lastLink, offset);
        cursorRange = odtDocument.convertDomToCursorRange({anchorNode:(domRange.startContainer), anchorOffset:domRange.startOffset, focusNode:(domRange.endContainer), focusOffset:domRange.endOffset});
        if(cursorRange.length > 0) {
          op = new ops.OpApplyHyperlink;
          (op).init({memberid:inputMemberId, position:cursorRange.position, length:cursorRange.length, hyperlink:odfUtils.getHyperlinkTarget(lastLink)});
          operations.push(op)
        }
      }
    }
    session.enqueue(operations);
    domRange.detach()
  }
  this.removeHyperlinks = removeHyperlinks
};
gui.EventManager = function EventManager(odtDocument) {
  var window = (runtime.getWindow()), bindToDirectHandler = {"beforecut":true, "beforepaste":true, "longpress":true, "drag":true, "dragstop":true}, bindToWindow = {"mousedown":true, "mouseup":true, "focus":true}, compoundEvents = {}, eventDelegates = {}, eventTrap, canvasElement = (odtDocument.getCanvas().getElement()), eventManager = this, longPressTimers = {}, LONGPRESS_DURATION = 400;
  function EventDelegate() {
    var self = this, recentEvents = [];
    this.filters = [];
    this.handlers = [];
    this.handleEvent = function(e) {
      if(recentEvents.indexOf(e) === -1) {
        recentEvents.push(e);
        if(self.filters.every(function(filter) {
          return filter(e)
        })) {
          self.handlers.forEach(function(handler) {
            handler(e)
          })
        }
        runtime.setTimeout(function() {
          recentEvents.splice(recentEvents.indexOf(e), 1)
        }, 0)
      }
    }
  }
  function CompoundEvent(eventName, dependencies, eventProxy) {
    var cachedState = {}, events = new core.EventNotifier(["eventTriggered"]);
    function subscribedProxy(event) {
      eventProxy(event, cachedState, function(compoundEventInstance) {
        compoundEventInstance.type = eventName;
        events.emit("eventTriggered", compoundEventInstance)
      })
    }
    this.subscribe = function(cb) {
      events.subscribe("eventTriggered", cb)
    };
    this.unsubscribe = function(cb) {
      events.unsubscribe("eventTriggered", cb)
    };
    this.destroy = function() {
      dependencies.forEach(function(eventName) {
        eventManager.unsubscribe(eventName, subscribedProxy)
      })
    };
    function init() {
      dependencies.forEach(function(eventName) {
        eventManager.subscribe(eventName, subscribedProxy)
      })
    }
    init()
  }
  function clearTimeout(timer) {
    runtime.clearTimeout(timer);
    delete longPressTimers[timer]
  }
  function setTimeout(fn, duration) {
    var timer = runtime.setTimeout(function() {
      fn();
      clearTimeout(timer)
    }, duration);
    longPressTimers[timer] = true;
    return timer
  }
  function getTarget(e) {
    return(e.target) || (e.srcElement || null)
  }
  function emitLongPressEvent(event, cachedState, callback) {
    var touchEvent = (event), fingers = (touchEvent.touches.length), touch = (touchEvent.touches[0]), timer = (cachedState).timer;
    if(event.type === "touchmove" || event.type === "touchend") {
      if(timer) {
        clearTimeout(timer)
      }
    }else {
      if(event.type === "touchstart") {
        if(fingers !== 1) {
          runtime.clearTimeout(timer)
        }else {
          timer = setTimeout(function() {
            callback({clientX:touch.clientX, clientY:touch.clientY, pageX:touch.pageX, pageY:touch.pageY, target:getTarget(event), detail:1})
          }, LONGPRESS_DURATION)
        }
      }
    }
    cachedState.timer = timer
  }
  function emitDragEvent(event, cachedState, callback) {
    var touchEvent = (event), fingers = (touchEvent.touches.length), touch = (touchEvent.touches[0]), target = (getTarget(event)), cachedTarget = (cachedState).target;
    if(fingers !== 1 || event.type === "touchend") {
      cachedTarget = null
    }else {
      if(event.type === "touchstart" && target.getAttribute("class") === "draggable") {
        cachedTarget = target
      }else {
        if(event.type === "touchmove" && cachedTarget) {
          event.preventDefault();
          event.stopPropagation();
          callback({clientX:touch.clientX, clientY:touch.clientY, pageX:touch.pageX, pageY:touch.pageY, target:cachedTarget, detail:1})
        }
      }
    }
    cachedState.target = cachedTarget
  }
  function emitDragStopEvent(event, cachedState, callback) {
    var touchEvent = (event), target = (getTarget(event)), touch, dragging = (cachedState).dragging;
    if(event.type === "drag") {
      dragging = true
    }else {
      if(event.type === "touchend" && dragging) {
        dragging = false;
        touch = (touchEvent.changedTouches[0]);
        callback({clientX:touch.clientX, clientY:touch.clientY, pageX:touch.pageX, pageY:touch.pageY, target:target, detail:1})
      }
    }
    cachedState.dragging = dragging
  }
  function declareTouchEnabled() {
    canvasElement.classList.add("webodf-touchEnabled");
    eventManager.unsubscribe("touchstart", declareTouchEnabled)
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
    var onVariant, bound = false;
    if(compoundEvents.hasOwnProperty(eventType)) {
      compoundEvents[eventType].subscribe(eventHandler);
      return
    }
    onVariant = "on" + eventType;
    if(eventTarget.attachEvent) {
      eventTarget.attachEvent(onVariant, eventHandler);
      bound = true
    }
    if(!bound && eventTarget.addEventListener) {
      eventTarget.addEventListener(eventType, eventHandler, false);
      bound = true
    }
    if((!bound || bindToDirectHandler[eventType]) && eventTarget.hasOwnProperty(onVariant)) {
      eventTarget[onVariant] = eventHandler
    }
  }
  function getDelegateForEvent(eventName, shouldCreate) {
    var delegate = eventDelegates[eventName] || null;
    if(!delegate && shouldCreate) {
      delegate = eventDelegates[eventName] = new EventDelegate;
      if(bindToWindow[eventName]) {
        listenEvent(window, eventName, delegate.handleEvent)
      }
      listenEvent(eventTrap, eventName, delegate.handleEvent);
      listenEvent(canvasElement, eventName, delegate.handleEvent)
    }
    return delegate
  }
  this.addFilter = function(eventName, filter) {
    var delegate = getDelegateForEvent(eventName, true);
    delegate.filters.push(filter)
  };
  this.removeFilter = function(eventName, filter) {
    var delegate = getDelegateForEvent(eventName, true), index = delegate.filters.indexOf(filter);
    if(index !== -1) {
      delegate.filters.splice(index, 1)
    }
  };
  this.subscribe = function(eventName, handler) {
    var delegate = getDelegateForEvent(eventName, true);
    delegate.handlers.push(handler)
  };
  this.unsubscribe = function(eventName, handler) {
    var delegate = getDelegateForEvent(eventName, false), handlerIndex = delegate && delegate.handlers.indexOf(handler);
    if(delegate && handlerIndex !== -1) {
      delegate.handlers.splice(handlerIndex, 1)
    }
  };
  function hasFocus() {
    return odtDocument.getDOMDocument().activeElement === eventTrap
  }
  this.hasFocus = hasFocus;
  function findScrollableParents(element) {
    var scrollParents = [];
    while(element) {
      if(element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight) {
        scrollParents.push(new ElementScrollState(element))
      }
      element = (element.parentNode)
    }
    scrollParents.push(new WindowScrollState(window));
    return scrollParents
  }
  this.focus = function() {
    var scrollParents;
    if(!hasFocus()) {
      scrollParents = findScrollableParents(eventTrap);
      eventTrap.focus();
      scrollParents.forEach(function(scrollParent) {
        scrollParent.restore()
      })
    }
  };
  this.getEventTrap = function() {
    return eventTrap
  };
  this.blur = function() {
    if(hasFocus()) {
      eventTrap.blur()
    }
  };
  this.destroy = function(callback) {
    Object.keys(longPressTimers).forEach(function(timer) {
      clearTimeout(parseInt(timer, 10))
    });
    longPressTimers.length = 0;
    Object.keys(compoundEvents).forEach(function(compoundEventName) {
      compoundEvents[compoundEventName].destroy()
    });
    compoundEvents = {};
    eventManager.unsubscribe("touchstart", declareTouchEnabled);
    eventTrap.parentNode.removeChild(eventTrap);
    callback()
  };
  function init() {
    var sizerElement = odtDocument.getOdfCanvas().getSizer(), doc = sizerElement.ownerDocument;
    runtime.assert(Boolean(window), "EventManager requires a window object to operate correctly");
    eventTrap = (doc.createElement("input"));
    eventTrap.id = "eventTrap";
    eventTrap.setAttribute("tabindex", -1);
    sizerElement.appendChild(eventTrap);
    compoundEvents.longpress = new CompoundEvent("longpress", ["touchstart", "touchmove", "touchend"], emitLongPressEvent);
    compoundEvents.drag = new CompoundEvent("drag", ["touchstart", "touchmove", "touchend"], emitDragEvent);
    compoundEvents.dragstop = new CompoundEvent("dragstop", ["drag", "touchend"], emitDragStopEvent);
    eventManager.subscribe("touchstart", declareTouchEnabled)
  }
  init()
};
/*

 Copyright (C) 2014 KO GmbH <copyright@kogmbh.com>

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
gui.IOSSafariSupport = function(eventManager) {
  var window = runtime.getWindow(), eventTrap = eventManager.getEventTrap();
  function suppressFocusScrollIfKeyboardOpen() {
    if(window.innerHeight !== window.outerHeight) {
      eventTrap.style.display = "none";
      runtime.requestAnimationFrame(function() {
        eventTrap.style.display = "block"
      })
    }
  }
  this.destroy = function(callback) {
    eventManager.unsubscribe("focus", suppressFocusScrollIfKeyboardOpen);
    eventTrap.removeAttribute("autocapitalize");
    eventTrap.style.WebkitTransform = "";
    callback()
  };
  function init() {
    eventManager.subscribe("focus", suppressFocusScrollIfKeyboardOpen);
    eventTrap.setAttribute("autocapitalize", "off");
    eventTrap.style.WebkitTransform = "translateX(-10000px)"
  }
  init()
};
gui.ImageController = function ImageController(session, inputMemberId, objectNameGenerator) {
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
gui.ImageSelector = function ImageSelector(odfCanvas) {
  var svgns = odf.Namespaces.svgns, imageSelectorId = "imageSelector", selectorBorderWidth = 1, squareClassNames = ["topLeft", "topRight", "bottomRight", "bottomLeft", "topMiddle", "rightMiddle", "bottomMiddle", "leftMiddle"], document = odfCanvas.getElement().ownerDocument, hasSelection = false;
  function createSelectorElement() {
    var sizerElement = odfCanvas.getSizer(), selectorElement = (document.createElement("div"));
    selectorElement.id = "imageSelector";
    selectorElement.style.borderWidth = selectorBorderWidth + "px";
    sizerElement.appendChild(selectorElement);
    function createDiv(className) {
      var squareElement = document.createElement("div");
      squareElement.className = className;
      selectorElement.appendChild(squareElement)
    }
    squareClassNames.forEach(createDiv);
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
(function() {
  function DetectSafariCompositionError(eventManager) {
    var lastCompositionValue, suppressedKeyPress = false;
    function suppressIncorrectKeyPress(e) {
      suppressedKeyPress = e.which && String.fromCharCode(e.which) === lastCompositionValue;
      lastCompositionValue = undefined;
      return suppressedKeyPress === false
    }
    function clearSuppression() {
      suppressedKeyPress = false
    }
    function trapComposedValue(e) {
      lastCompositionValue = e.data;
      suppressedKeyPress = false
    }
    function init() {
      eventManager.subscribe("textInput", clearSuppression);
      eventManager.subscribe("compositionend", trapComposedValue);
      eventManager.addFilter("keypress", suppressIncorrectKeyPress)
    }
    this.destroy = function(callback) {
      eventManager.unsubscribe("textInput", clearSuppression);
      eventManager.unsubscribe("compositionend", trapComposedValue);
      eventManager.removeFilter("keypress", suppressIncorrectKeyPress);
      callback()
    };
    init()
  }
  gui.InputMethodEditor = function InputMethodEditor(inputMemberId, eventManager) {
    var cursorns = "urn:webodf:names:cursor", localCursor = null, eventTrap = eventManager.getEventTrap(), doc = (eventTrap.ownerDocument), compositionElement, async = new core.Async, FAKE_CONTENT = "b", processUpdates, pendingEvent = false, pendingData = "", events = new core.EventNotifier([gui.InputMethodEditor.signalCompositionStart, gui.InputMethodEditor.signalCompositionEnd]), lastCompositionData, filters = [], cleanup, isEditable = false;
    this.subscribe = events.subscribe;
    this.unsubscribe = events.unsubscribe;
    function setCursorComposing(state) {
      if(localCursor) {
        if(state) {
          localCursor.getNode().setAttributeNS(cursorns, "composing", "true")
        }else {
          localCursor.getNode().removeAttributeNS(cursorns, "composing");
          compositionElement.textContent = ""
        }
      }
    }
    function flushEvent() {
      if(pendingEvent) {
        pendingEvent = false;
        setCursorComposing(false);
        events.emit(gui.InputMethodEditor.signalCompositionEnd, {data:pendingData});
        pendingData = ""
      }
    }
    function addCompositionData(data) {
      pendingEvent = true;
      pendingData += data;
      processUpdates.trigger()
    }
    function resetWindowSelection() {
      flushEvent();
      if(localCursor && localCursor.getSelectedRange().collapsed) {
        eventTrap.value = ""
      }else {
        eventTrap.value = FAKE_CONTENT
      }
      eventTrap.setSelectionRange(0, eventTrap.value.length)
    }
    function compositionStart() {
      lastCompositionData = undefined;
      processUpdates.cancel();
      setCursorComposing(true);
      if(!pendingEvent) {
        events.emit(gui.InputMethodEditor.signalCompositionStart, {data:""})
      }
    }
    function compositionEnd(e) {
      lastCompositionData = e.data;
      addCompositionData(e.data)
    }
    function textInput(e) {
      if(e.data !== lastCompositionData) {
        addCompositionData(e.data)
      }
      lastCompositionData = undefined
    }
    function synchronizeCompositionText() {
      compositionElement.textContent = eventTrap.value
    }
    this.registerCursor = function(cursor) {
      if(cursor.getMemberId() === inputMemberId) {
        localCursor = cursor;
        localCursor.getNode().appendChild(compositionElement);
        eventManager.subscribe("input", synchronizeCompositionText);
        eventManager.subscribe("compositionupdate", synchronizeCompositionText)
      }
    };
    this.removeCursor = function(memberid) {
      if(localCursor && memberid === inputMemberId) {
        localCursor.getNode().removeChild(compositionElement);
        eventManager.unsubscribe("input", synchronizeCompositionText);
        eventManager.unsubscribe("compositionupdate", synchronizeCompositionText);
        localCursor = null
      }
    };
    function suppressFocus() {
      eventManager.blur();
      eventTrap.setAttribute("disabled", true)
    }
    function synchronizeEventStatus() {
      var hasFocus = eventManager.hasFocus();
      if(hasFocus) {
        eventManager.blur()
      }
      if(isEditable) {
        eventTrap.removeAttribute("disabled")
      }else {
        eventTrap.setAttribute("disabled", true)
      }
      if(hasFocus) {
        eventManager.focus()
      }
    }
    this.setEditing = function(editable) {
      isEditable = editable;
      synchronizeEventStatus()
    };
    this.destroy = function(callback) {
      eventManager.unsubscribe("compositionstart", compositionStart);
      eventManager.unsubscribe("compositionend", compositionEnd);
      eventManager.unsubscribe("textInput", textInput);
      eventManager.unsubscribe("keypress", flushEvent);
      eventManager.unsubscribe("mousedown", suppressFocus);
      eventManager.unsubscribe("mouseup", synchronizeEventStatus);
      eventManager.unsubscribe("focus", resetWindowSelection);
      async.destroyAll(cleanup, callback)
    };
    function init() {
      eventManager.subscribe("compositionstart", compositionStart);
      eventManager.subscribe("compositionend", compositionEnd);
      eventManager.subscribe("textInput", textInput);
      eventManager.subscribe("keypress", flushEvent);
      eventManager.subscribe("mousedown", suppressFocus);
      eventManager.subscribe("mouseup", synchronizeEventStatus);
      eventManager.subscribe("focus", resetWindowSelection);
      filters.push(new DetectSafariCompositionError(eventManager));
      function getDestroy(filter) {
        return filter.destroy
      }
      cleanup = filters.map(getDestroy);
      compositionElement = doc.createElement("span");
      compositionElement.setAttribute("id", "composer");
      processUpdates = new core.ScheduledTask(resetWindowSelection, 1);
      cleanup.push(processUpdates.destroy)
    }
    init()
  };
  gui.InputMethodEditor.signalCompositionStart = "input/compositionstart";
  gui.InputMethodEditor.signalCompositionEnd = "input/compositionend";
  return gui.InputMethodEditor
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
  this.bind = function(keyCode, modifiers, callback, overwrite) {
    var keyCombo = getKeyCombo(keyCode, modifiers);
    runtime.assert(overwrite || bindings.hasOwnProperty(keyCombo) === false, "tried to overwrite the callback handler of key combo: " + keyCombo);
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
gui.KeyboardHandler.KeyCode = {Backspace:8, Tab:9, Clear:12, Enter:13, Ctrl:17, End:35, Home:36, Left:37, Up:38, Right:39, Down:40, Delete:46, A:65, B:66, C:67, D:68, E:69, F:70, G:71, H:72, I:73, J:74, K:75, L:76, M:77, N:78, O:79, P:80, Q:81, R:82, S:83, T:84, U:85, V:86, W:87, X:88, Y:89, Z:90, LeftMeta:91, MetaInMozilla:224};
(function() {
  return gui.KeyboardHandler
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
/*

 Copyright (C) 2014 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
odf.WordBoundaryFilter = function WordBoundaryFilter(odtDocument, includeWhitespace) {
  var TEXT_NODE = Node.TEXT_NODE, ELEMENT_NODE = Node.ELEMENT_NODE, odfUtils = new odf.OdfUtils, punctuation = /[!-#%-*,-\/:-;?-@\[-\]_{}\u00a1\u00ab\u00b7\u00bb\u00bf;\u00b7\u055a-\u055f\u0589-\u058a\u05be\u05c0\u05c3\u05c6\u05f3-\u05f4\u0609-\u060a\u060c-\u060d\u061b\u061e-\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0964-\u0965\u0970\u0df4\u0e4f\u0e5a-\u0e5b\u0f04-\u0f12\u0f3a-\u0f3d\u0f85\u0fd0-\u0fd4\u104a-\u104f\u10fb\u1361-\u1368\u166d-\u166e\u169b-\u169c\u16eb-\u16ed\u1735-\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u180a\u1944-\u1945\u19de-\u19df\u1a1e-\u1a1f\u1b5a-\u1b60\u1c3b-\u1c3f\u1c7e-\u1c7f\u2000-\u206e\u207d-\u207e\u208d-\u208e\u3008-\u3009\u2768-\u2775\u27c5-\u27c6\u27e6-\u27ef\u2983-\u2998\u29d8-\u29db\u29fc-\u29fd\u2cf9-\u2cfc\u2cfe-\u2cff\u2e00-\u2e7e\u3000-\u303f\u30a0\u30fb\ua60d-\ua60f\ua673\ua67e\ua874-\ua877\ua8ce-\ua8cf\ua92e-\ua92f\ua95f\uaa5c-\uaa5f\ufd3e-\ufd3f\ufe10-\ufe19\ufe30-\ufe52\ufe54-\ufe61\ufe63\ufe68\ufe6a-\ufe6b\uff01-\uff03\uff05-\uff0a\uff0c-\uff0f\uff1a-\uff1b\uff1f-\uff20\uff3b-\uff3d\uff3f\uff5b\uff5d\uff5f-\uff65]|\ud800[\udd00-\udd01\udf9f\udfd0]|\ud802[\udd1f\udd3f\ude50-\ude58]|\ud809[\udc00-\udc7e]/, 
  spacing = /\s/, FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT, FILTER_REJECT = core.PositionFilter.FilterResult.FILTER_REJECT, TRAILING = odf.WordBoundaryFilter.IncludeWhitespace.TRAILING, LEADING = odf.WordBoundaryFilter.IncludeWhitespace.LEADING, NeighborType = {NO_NEIGHBOUR:0, SPACE_CHAR:1, PUNCTUATION_CHAR:2, WORD_CHAR:3, OTHER:4};
  function findHigherNeighborNode(node, direction, nodeFilter) {
    var neighboringNode = null, rootNode = odtDocument.getRootNode(), unfilteredCandidate;
    while(node !== rootNode && (node !== null && neighboringNode === null)) {
      unfilteredCandidate = direction < 0 ? node.previousSibling : node.nextSibling;
      if(nodeFilter(unfilteredCandidate) === NodeFilter.FILTER_ACCEPT) {
        neighboringNode = unfilteredCandidate
      }
      node = node.parentNode
    }
    return neighboringNode
  }
  function typeOfNeighbor(node, getOffset) {
    var neighboringChar;
    if(node === null) {
      return NeighborType.NO_NEIGHBOUR
    }
    if(odfUtils.isCharacterElement(node)) {
      return NeighborType.SPACE_CHAR
    }
    if(node.nodeType === TEXT_NODE || (odfUtils.isTextSpan(node) || odfUtils.isHyperlink(node))) {
      neighboringChar = node.textContent.charAt(getOffset());
      if(spacing.test(neighboringChar)) {
        return NeighborType.SPACE_CHAR
      }
      if(punctuation.test(neighboringChar)) {
        return NeighborType.PUNCTUATION_CHAR
      }
      return NeighborType.WORD_CHAR
    }
    return NeighborType.OTHER
  }
  this.acceptPosition = function(iterator) {
    var container = iterator.container(), leftNode = iterator.leftNode(), rightNode = iterator.rightNode(), getRightCharOffset = iterator.unfilteredDomOffset, getLeftCharOffset = function() {
      return iterator.unfilteredDomOffset() - 1
    }, leftNeighborType, rightNeighborType;
    if(container.nodeType === ELEMENT_NODE) {
      if(rightNode === null) {
        rightNode = findHigherNeighborNode(container, 1, iterator.getNodeFilter())
      }
      if(leftNode === null) {
        leftNode = findHigherNeighborNode(container, -1, iterator.getNodeFilter())
      }
    }
    if(container !== rightNode) {
      getRightCharOffset = function() {
        return 0
      }
    }
    if(container !== leftNode && leftNode !== null) {
      getLeftCharOffset = function() {
        return leftNode.textContent.length - 1
      }
    }
    leftNeighborType = typeOfNeighbor(leftNode, getLeftCharOffset);
    rightNeighborType = typeOfNeighbor(rightNode, getRightCharOffset);
    if(leftNeighborType === NeighborType.WORD_CHAR && rightNeighborType === NeighborType.WORD_CHAR || (leftNeighborType === NeighborType.PUNCTUATION_CHAR && rightNeighborType === NeighborType.PUNCTUATION_CHAR || (includeWhitespace === TRAILING && (leftNeighborType !== NeighborType.NO_NEIGHBOUR && rightNeighborType === NeighborType.SPACE_CHAR) || includeWhitespace === LEADING && (leftNeighborType === NeighborType.SPACE_CHAR && rightNeighborType !== NeighborType.NO_NEIGHBOUR)))) {
      return FILTER_REJECT
    }
    return FILTER_ACCEPT
  }
};
odf.WordBoundaryFilter.IncludeWhitespace = {None:0, TRAILING:1, LEADING:2};
(function() {
  return odf.WordBoundaryFilter
})();
gui.SelectionController = function SelectionController(session, inputMemberId) {
  var odtDocument = session.getOdtDocument(), domUtils = new core.DomUtils, odfUtils = new odf.OdfUtils, baseFilter = odtDocument.getPositionFilter(), keyboardMovementsFilter = new core.PositionFilterChain, rootFilter = odtDocument.createRootFilter(inputMemberId), TRAILING_SPACE = odf.WordBoundaryFilter.IncludeWhitespace.TRAILING, LEADING_SPACE = odf.WordBoundaryFilter.IncludeWhitespace.LEADING;
  function createKeyboardStepIterator() {
    var cursor = odtDocument.getCursor(inputMemberId), node = cursor.getNode();
    return odtDocument.createStepIterator(node, 0, [baseFilter, rootFilter], odtDocument.getRootElement(node))
  }
  function createWordBoundaryStepIterator(node, offset, includeWhitespace) {
    var wordBoundaryFilter = new odf.WordBoundaryFilter(odtDocument, includeWhitespace);
    return odtDocument.createStepIterator(node, offset, [baseFilter, rootFilter, wordBoundaryFilter], odtDocument.getRootElement(node))
  }
  function constrain(lookup) {
    return function(originalNode) {
      var originalContainer = lookup(originalNode);
      return function(step, node) {
        return lookup(node) === originalContainer
      }
    }
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
  this.selectionToRange = selectionToRange;
  function rangeToSelection(range, hasForwardSelection) {
    if(hasForwardSelection) {
      return{anchorNode:(range.startContainer), anchorOffset:range.startOffset, focusNode:(range.endContainer), focusOffset:range.endOffset}
    }
    return{anchorNode:(range.endContainer), anchorOffset:range.endOffset, focusNode:(range.startContainer), focusOffset:range.startOffset}
  }
  this.rangeToSelection = rangeToSelection;
  function createOpMoveCursor(position, length, selectionType) {
    var op = new ops.OpMoveCursor;
    op.init({memberid:inputMemberId, position:position, length:length || 0, selectionType:selectionType});
    return op
  }
  function selectImage(frameNode) {
    var frameRoot = odtDocument.getRootElement(frameNode), frameRootFilter = odtDocument.createRootFilter(frameRoot), stepIterator = odtDocument.createStepIterator(frameNode, 0, [frameRootFilter, odtDocument.getPositionFilter()], frameRoot), anchorNode, anchorOffset, newSelection, op;
    if(!stepIterator.roundToPreviousStep()) {
      runtime.assert(false, "No walkable position before frame")
    }
    anchorNode = stepIterator.container();
    anchorOffset = stepIterator.offset();
    stepIterator.setPosition(frameNode, frameNode.childNodes.length);
    if(!stepIterator.roundToNextStep()) {
      runtime.assert(false, "No walkable position after frame")
    }
    newSelection = odtDocument.convertDomToCursorRange({anchorNode:anchorNode, anchorOffset:anchorOffset, focusNode:stepIterator.container(), focusOffset:stepIterator.offset()});
    op = createOpMoveCursor(newSelection.position, newSelection.length, ops.OdtCursor.RegionSelection);
    session.enqueue([op])
  }
  this.selectImage = selectImage;
  function expandToWordBoundaries(range) {
    var stepIterator;
    stepIterator = createWordBoundaryStepIterator((range.startContainer), range.startOffset, TRAILING_SPACE);
    if(stepIterator.roundToPreviousStep()) {
      range.setStart(stepIterator.container(), stepIterator.offset())
    }
    stepIterator = createWordBoundaryStepIterator((range.endContainer), range.endOffset, LEADING_SPACE);
    if(stepIterator.roundToNextStep()) {
      range.setEnd(stepIterator.container(), stepIterator.offset())
    }
  }
  this.expandToWordBoundaries = expandToWordBoundaries;
  function expandToParagraphBoundaries(range) {
    var paragraphs = odfUtils.getParagraphElements(range), startParagraph = paragraphs[0], endParagraph = paragraphs[paragraphs.length - 1];
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
  this.expandToParagraphBoundaries = expandToParagraphBoundaries;
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
      if(lengthAdjust > 0) {
        lengthAdjust = stepCounter.convertForwardStepsBetweenFilters(lengthAdjust, keyboardMovementsFilter, baseFilter)
      }else {
        lengthAdjust = -stepCounter.convertBackwardStepsBetweenFilters(-lengthAdjust, keyboardMovementsFilter, baseFilter)
      }
      newLength = selection.length + lengthAdjust;
      session.enqueue([createOpMoveCursor(selection.position, newLength)])
    }
  }
  function extendSelection(advanceIterator) {
    var stepIterator = createKeyboardStepIterator(), anchorNode = odtDocument.getCursor(inputMemberId).getAnchorNode(), newSelection;
    if(advanceIterator(stepIterator)) {
      newSelection = odtDocument.convertDomToCursorRange({anchorNode:anchorNode, anchorOffset:0, focusNode:stepIterator.container(), focusOffset:stepIterator.offset()});
      session.enqueue([createOpMoveCursor(newSelection.position, newSelection.length)])
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
  function moveCursor(advanceIterator) {
    var stepIterator = createKeyboardStepIterator(), position;
    if(advanceIterator(stepIterator)) {
      position = odtDocument.convertDomPointToCursorStep(stepIterator.container(), stepIterator.offset());
      session.enqueue([createOpMoveCursor(position, 0)])
    }
  }
  function moveCursorToLeft() {
    moveCursor(function(iterator) {
      return iterator.previousStep()
    });
    return true
  }
  this.moveCursorToLeft = moveCursorToLeft;
  function moveCursorToRight() {
    moveCursor(function(iterator) {
      return iterator.nextStep()
    });
    return true
  }
  this.moveCursorToRight = moveCursorToRight;
  function extendSelectionToLeft() {
    extendSelection(function(iterator) {
      return iterator.previousStep()
    });
    return true
  }
  this.extendSelectionToLeft = extendSelectionToLeft;
  function extendSelectionToRight() {
    extendSelection(function(iterator) {
      return iterator.nextStep()
    });
    return true
  }
  this.extendSelectionToRight = extendSelectionToRight;
  function moveCursorByLine(direction, extend) {
    var paragraphNode = odtDocument.getParagraphElement(odtDocument.getCursor(inputMemberId).getNode()), steps;
    runtime.assert(Boolean(paragraphNode), "SelectionController: Cursor outside paragraph");
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
  this.moveCursorUp = moveCursorUp;
  function moveCursorDown() {
    moveCursorByLine(1, false);
    return true
  }
  this.moveCursorDown = moveCursorDown;
  function extendSelectionUp() {
    moveCursorByLine(-1, true);
    return true
  }
  this.extendSelectionUp = extendSelectionUp;
  function extendSelectionDown() {
    moveCursorByLine(1, true);
    return true
  }
  this.extendSelectionDown = extendSelectionDown;
  function moveCursorToLineBoundary(direction, extend) {
    var steps = odtDocument.getCursor(inputMemberId).getStepCounter().countStepsToLineBoundary(direction, keyboardMovementsFilter);
    if(extend) {
      extendCursorByAdjustment(steps)
    }else {
      moveCursorByAdjustment(steps)
    }
  }
  function moveCursorByWord(direction, extend) {
    var cursor = odtDocument.getCursor(inputMemberId), newSelection = rangeToSelection(cursor.getSelectedRange(), cursor.hasForwardSelection()), newCursorSelection, selectionUpdated, stepIterator = createWordBoundaryStepIterator(newSelection.focusNode, newSelection.focusOffset, TRAILING_SPACE);
    if(direction >= 0) {
      selectionUpdated = stepIterator.nextStep()
    }else {
      selectionUpdated = stepIterator.previousStep()
    }
    if(selectionUpdated) {
      newSelection.focusNode = stepIterator.container();
      newSelection.focusOffset = stepIterator.offset();
      if(!extend) {
        newSelection.anchorNode = newSelection.focusNode;
        newSelection.anchorOffset = newSelection.focusOffset
      }
      newCursorSelection = odtDocument.convertDomToCursorRange(newSelection);
      session.enqueue([createOpMoveCursor(newCursorSelection.position, newCursorSelection.length)])
    }
  }
  function moveCursorBeforeWord() {
    moveCursorByWord(-1, false);
    return true
  }
  this.moveCursorBeforeWord = moveCursorBeforeWord;
  function moveCursorPastWord() {
    moveCursorByWord(1, false);
    return true
  }
  this.moveCursorPastWord = moveCursorPastWord;
  function extendSelectionBeforeWord() {
    moveCursorByWord(-1, true);
    return true
  }
  this.extendSelectionBeforeWord = extendSelectionBeforeWord;
  function extendSelectionPastWord() {
    moveCursorByWord(1, true);
    return true
  }
  this.extendSelectionPastWord = extendSelectionPastWord;
  function moveCursorToLineStart() {
    moveCursorToLineBoundary(-1, false);
    return true
  }
  this.moveCursorToLineStart = moveCursorToLineStart;
  function moveCursorToLineEnd() {
    moveCursorToLineBoundary(1, false);
    return true
  }
  this.moveCursorToLineEnd = moveCursorToLineEnd;
  function extendSelectionToLineStart() {
    moveCursorToLineBoundary(-1, true);
    return true
  }
  this.extendSelectionToLineStart = extendSelectionToLineStart;
  function extendSelectionToLineEnd() {
    moveCursorToLineBoundary(1, true);
    return true
  }
  this.extendSelectionToLineEnd = extendSelectionToLineEnd;
  function extendCursorToNodeBoundary(direction, getContainmentNode) {
    var cursor = odtDocument.getCursor(inputMemberId), node = getContainmentNode(cursor.getNode()), selection = rangeToSelection(cursor.getSelectedRange(), cursor.hasForwardSelection()), newCursorSelection;
    runtime.assert(Boolean(node), "SelectionController: Cursor outside root");
    if(direction < 0) {
      selection.focusNode = (node);
      selection.focusOffset = 0
    }else {
      selection.focusNode = (node);
      selection.focusOffset = node.childNodes.length
    }
    newCursorSelection = odtDocument.convertDomToCursorRange(selection, constrain(getContainmentNode));
    session.enqueue([createOpMoveCursor(newCursorSelection.position, newCursorSelection.length)])
  }
  function extendSelectionToParagraphStart() {
    extendCursorToNodeBoundary(-1, odtDocument.getParagraphElement);
    return true
  }
  this.extendSelectionToParagraphStart = extendSelectionToParagraphStart;
  function extendSelectionToParagraphEnd() {
    extendCursorToNodeBoundary(1, odtDocument.getParagraphElement);
    return true
  }
  this.extendSelectionToParagraphEnd = extendSelectionToParagraphEnd;
  function moveCursorToRootBoundary(direction) {
    var cursor = odtDocument.getCursor(inputMemberId), root = odtDocument.getRootElement(cursor.getNode()), newPosition;
    runtime.assert(Boolean(root), "SelectionController: Cursor outside root");
    if(direction < 0) {
      newPosition = odtDocument.convertDomPointToCursorStep(root, 0, function(step) {
        return step === ops.StepsTranslator.NEXT_STEP
      })
    }else {
      newPosition = odtDocument.convertDomPointToCursorStep(root, root.childNodes.length)
    }
    session.enqueue([createOpMoveCursor(newPosition, 0)]);
    return true
  }
  function moveCursorToDocumentStart() {
    moveCursorToRootBoundary(-1);
    return true
  }
  this.moveCursorToDocumentStart = moveCursorToDocumentStart;
  function moveCursorToDocumentEnd() {
    moveCursorToRootBoundary(1);
    return true
  }
  this.moveCursorToDocumentEnd = moveCursorToDocumentEnd;
  function extendSelectionToDocumentStart() {
    extendCursorToNodeBoundary(-1, odtDocument.getRootElement);
    return true
  }
  this.extendSelectionToDocumentStart = extendSelectionToDocumentStart;
  function extendSelectionToDocumentEnd() {
    extendCursorToNodeBoundary(1, odtDocument.getRootElement);
    return true
  }
  this.extendSelectionToDocumentEnd = extendSelectionToDocumentEnd;
  function extendSelectionToEntireDocument() {
    var cursor = odtDocument.getCursor(inputMemberId), root = odtDocument.getRootElement(cursor.getNode()), newSelection, newCursorSelection;
    runtime.assert(Boolean(root), "SelectionController: Cursor outside root");
    newSelection = {anchorNode:root, anchorOffset:0, focusNode:root, focusOffset:root.childNodes.length};
    newCursorSelection = odtDocument.convertDomToCursorRange(newSelection, constrain(odtDocument.getRootElement));
    session.enqueue([createOpMoveCursor(newCursorSelection.position, newCursorSelection.length)]);
    return true
  }
  this.extendSelectionToEntireDocument = extendSelectionToEntireDocument;
  function init() {
    keyboardMovementsFilter.addFilter(baseFilter);
    keyboardMovementsFilter.addFilter(odtDocument.createRootFilter(inputMemberId))
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
gui.TextController = function TextController(session, inputMemberId, directStyleOp, paragraphStyleOps) {
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
    var selection = toForwardSelection(odtDocument.getCursorSelection(inputMemberId)), op, operations = [], styleOps;
    if(selection.length > 0) {
      op = createOpRemoveSelection(selection);
      operations.push(op)
    }
    op = new ops.OpSplitParagraph;
    op.init({memberid:inputMemberId, position:selection.position, moveCursor:true});
    operations.push(op);
    if(paragraphStyleOps) {
      styleOps = paragraphStyleOps(selection.position + 1);
      operations = operations.concat(styleOps)
    }
    session.enqueue(operations);
    return true
  };
  function hasPositionInDirection(cursorNode, forward) {
    var rootConstrainedFilter = new core.PositionFilterChain, iterator = gui.SelectionMover.createPositionIterator(odtDocument.getRootElement(cursorNode)), nextPosition = (forward ? iterator.nextPosition : iterator.previousPosition);
    rootConstrainedFilter.addFilter(odtDocument.getPositionFilter());
    rootConstrainedFilter.addFilter(odtDocument.createRootFilter(inputMemberId));
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
    var selection = toForwardSelection(odtDocument.getCursorSelection(inputMemberId)), op, stylingOp, operations = [], useCachedStyle = false;
    if(selection.length > 0) {
      op = createOpRemoveSelection(selection);
      operations.push(op);
      useCachedStyle = true
    }
    op = new ops.OpInsertText;
    op.init({memberid:inputMemberId, position:selection.position, text:text, moveCursor:true});
    operations.push(op);
    if(directStyleOp) {
      stylingOp = directStyleOp(selection.position, text.length, useCachedStyle);
      if(stylingOp) {
        operations.push(stylingOp)
      }
    }
    session.enqueue(operations)
  }
  this.insertText = insertText
};
(function() {
  return gui.TextController
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
gui.UndoManager.prototype.setDocument = function(newDocument) {
};
gui.UndoManager.prototype.setInitialState = function() {
};
gui.UndoManager.prototype.initialize = function() {
};
gui.UndoManager.prototype.purgeInitialState = function() {
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
(function() {
  var FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT;
  gui.SessionController = function SessionController(session, inputMemberId, shadowCursor, args) {
    var window = (runtime.getWindow()), odtDocument = session.getOdtDocument(), async = new core.Async, domUtils = new core.DomUtils, odfUtils = new odf.OdfUtils, mimeDataExporter = new gui.MimeDataExporter, clipboard = new gui.Clipboard(mimeDataExporter), keyDownHandler = new gui.KeyboardHandler, keyPressHandler = new gui.KeyboardHandler, keyUpHandler = new gui.KeyboardHandler, clickStartedWithinCanvas = false, objectNameGenerator = new odf.ObjectNameGenerator(odtDocument.getOdfCanvas().odfContainer(), 
    inputMemberId), isMouseMoved = false, mouseDownRootFilter = null, handleMouseClickTimeoutId, undoManager = null, eventManager = new gui.EventManager(odtDocument), annotationController = new gui.AnnotationController(session, inputMemberId), directFormattingController = new gui.DirectFormattingController(session, inputMemberId, objectNameGenerator, args.directParagraphStylingEnabled), createCursorStyleOp = (directFormattingController.createCursorStyleOp), createParagraphStyleOps = (directFormattingController.createParagraphStyleOps), 
    textController = new gui.TextController(session, inputMemberId, createCursorStyleOp, createParagraphStyleOps), imageController = new gui.ImageController(session, inputMemberId, objectNameGenerator), imageSelector = new gui.ImageSelector(odtDocument.getOdfCanvas()), shadowCursorIterator = gui.SelectionMover.createPositionIterator(odtDocument.getRootNode()), drawShadowCursorTask, redrawRegionSelectionTask, pasteHandler = new gui.PlainTextPasteboard(odtDocument, inputMemberId), inputMethodEditor = 
    new gui.InputMethodEditor(inputMemberId, eventManager), clickCount = 0, hyperlinkClickHandler = new gui.HyperlinkClickHandler(odtDocument.getRootNode), hyperlinkController = new gui.HyperlinkController(session, inputMemberId), selectionController = new gui.SelectionController(session, inputMemberId), modifier = gui.KeyboardHandler.Modifier, keyCode = gui.KeyboardHandler.KeyCode, isMacOS = window.navigator.appVersion.toLowerCase().indexOf("mac") !== -1, isIOS = ["iPad", "iPod", "iPhone"].indexOf(window.navigator.platform) !== 
    -1, iOSSafariSupport;
    runtime.assert(window !== null, "Expected to be run in an environment which has a global window, like a browser.");
    function getTarget(e) {
      return(e.target) || (e.srcElement || null)
    }
    function cancelEvent(event) {
      if(event.preventDefault) {
        event.preventDefault()
      }else {
        event.returnValue = false
      }
    }
    function caretPositionFromPoint(x, y) {
      var doc = odtDocument.getDOMDocument(), c, result = null;
      if(doc.caretRangeFromPoint) {
        c = doc.caretRangeFromPoint(x, y);
        result = {container:(c.startContainer), offset:c.startOffset}
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
        textController.removeCurrentSelection()
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
        textController.removeCurrentSelection();
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
      var eventTrap = eventManager.getEventTrap(), sizer, hadFocusBefore;
      if(undoManager) {
        hadFocusBefore = eventManager.hasFocus();
        undoManager.moveBackward(1);
        sizer = odtDocument.getOdfCanvas().getSizer();
        if(!domUtils.containsNode(sizer, eventTrap)) {
          sizer.appendChild(eventTrap);
          if(hadFocusBefore) {
            eventManager.focus()
          }
        }
        return true
      }
      return false
    }
    this.undo = undo;
    function redo() {
      var hadFocusBefore;
      if(undoManager) {
        hadFocusBefore = eventManager.hasFocus();
        undoManager.moveForward(1);
        if(hadFocusBefore) {
          eventManager.focus()
        }
        return true
      }
      return false
    }
    this.redo = redo;
    function extendSelectionByDrag(event) {
      var position, cursor = odtDocument.getCursor(inputMemberId), selectedRange = cursor.getSelectedRange(), newSelectionRange, handleEnd = (getTarget(event)).getAttribute("end");
      if(selectedRange && handleEnd) {
        position = caretPositionFromPoint(event.clientX, event.clientY);
        if(position) {
          shadowCursorIterator.setUnfilteredPosition(position.container, position.offset);
          if(mouseDownRootFilter.acceptPosition(shadowCursorIterator) === FILTER_ACCEPT) {
            newSelectionRange = (selectedRange.cloneRange());
            if(handleEnd === "left") {
              newSelectionRange.setStart(shadowCursorIterator.container(), shadowCursorIterator.unfilteredDomOffset())
            }else {
              newSelectionRange.setEnd(shadowCursorIterator.container(), shadowCursorIterator.unfilteredDomOffset())
            }
            shadowCursor.setSelectedRange(newSelectionRange, handleEnd === "right");
            odtDocument.emit(ops.Document.signalCursorMoved, shadowCursor)
          }
        }
      }
    }
    function updateCursorSelection() {
      selectionController.selectRange(shadowCursor.getSelectedRange(), shadowCursor.hasForwardSelection(), 1)
    }
    function updateShadowCursor() {
      var selection = window.getSelection(), selectionRange = selection.rangeCount > 0 && selectionController.selectionToRange(selection);
      if(clickStartedWithinCanvas && selectionRange) {
        isMouseMoved = true;
        imageSelector.clearSelection();
        shadowCursorIterator.setUnfilteredPosition((selection.focusNode), selection.focusOffset);
        if(mouseDownRootFilter.acceptPosition(shadowCursorIterator) === FILTER_ACCEPT) {
          if(clickCount === 2) {
            selectionController.expandToWordBoundaries(selectionRange.range)
          }else {
            if(clickCount >= 3) {
              selectionController.expandToParagraphBoundaries(selectionRange.range)
            }
          }
          shadowCursor.setSelectedRange(selectionRange.range, selectionRange.hasForwardSelection);
          odtDocument.emit(ops.Document.signalCursorMoved, shadowCursor)
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
        selection.addRange(range.cloneRange())
      }
    }
    function handleMouseDown(e) {
      var target = getTarget(e), cursor = odtDocument.getCursor(inputMemberId);
      clickStartedWithinCanvas = target !== null && domUtils.containsNode(odtDocument.getOdfCanvas().getElement(), target);
      if(clickStartedWithinCanvas) {
        isMouseMoved = false;
        mouseDownRootFilter = odtDocument.createRootFilter((target));
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
    function getNextWalkablePosition(node) {
      var root = odtDocument.getRootElement(node), rootFilter = odtDocument.createRootFilter(root), stepIterator = odtDocument.createStepIterator(node, 0, [rootFilter, odtDocument.getPositionFilter()], root);
      stepIterator.setPosition(node, node.childNodes.length);
      if(!stepIterator.roundToNextStep()) {
        return null
      }
      return{container:stepIterator.container(), offset:stepIterator.offset()}
    }
    function moveByMouseClickEvent(event) {
      var selection = mutableSelection(window.getSelection()), position, selectionRange, rect, frameNode;
      if(!selection.anchorNode && !selection.focusNode) {
        position = caretPositionFromPoint(event.clientX, event.clientY);
        if(position) {
          selection.anchorNode = (position.container);
          selection.anchorOffset = position.offset;
          selection.focusNode = selection.anchorNode;
          selection.focusOffset = selection.anchorOffset
        }
      }
      if(odfUtils.isImage(selection.focusNode) && (selection.focusOffset === 0 && odfUtils.isCharacterFrame(selection.focusNode.parentNode))) {
        frameNode = (selection.focusNode.parentNode);
        rect = frameNode.getBoundingClientRect();
        if(event.clientX > rect.right) {
          position = getNextWalkablePosition(frameNode);
          if(position) {
            selection.anchorNode = selection.focusNode = position.container;
            selection.anchorOffset = selection.focusOffset = position.offset
          }
        }
      }else {
        if(odfUtils.isImage(selection.focusNode.firstChild) && (selection.focusOffset === 1 && odfUtils.isCharacterFrame(selection.focusNode))) {
          position = getNextWalkablePosition(selection.focusNode);
          if(position) {
            selection.anchorNode = selection.focusNode = position.container;
            selection.anchorOffset = selection.focusOffset = position.offset
          }
        }
      }
      if(selection.anchorNode && selection.focusNode) {
        selectionRange = selectionController.selectionToRange(selection);
        selectionController.selectRange(selectionRange.range, selectionRange.hasForwardSelection, event.detail)
      }
      eventManager.focus()
    }
    function selectWordByLongPress(event) {
      var selection, position, selectionRange, container, offset;
      position = caretPositionFromPoint(event.clientX, event.clientY);
      if(position) {
        container = (position.container);
        offset = position.offset;
        selection = {anchorNode:container, anchorOffset:offset, focusNode:container, focusOffset:offset};
        selectionRange = selectionController.selectionToRange(selection);
        selectionController.selectRange(selectionRange.range, selectionRange.hasForwardSelection, 2);
        eventManager.focus()
      }
    }
    function handleMouseClickEvent(event) {
      var target = getTarget(event), range, wasCollapsed, frameNode, pos;
      drawShadowCursorTask.processRequests();
      if(odfUtils.isImage(target) && (odfUtils.isCharacterFrame(target.parentNode) && window.getSelection().isCollapsed)) {
        selectionController.selectImage((target.parentNode));
        eventManager.focus()
      }else {
        if(imageSelector.isSelectorElement(target)) {
          eventManager.focus()
        }else {
          if(clickStartedWithinCanvas) {
            if(isMouseMoved) {
              range = shadowCursor.getSelectedRange();
              wasCollapsed = range.collapsed;
              if(odfUtils.isImage(range.endContainer) && (range.endOffset === 0 && odfUtils.isCharacterFrame(range.endContainer.parentNode))) {
                frameNode = (range.endContainer.parentNode);
                pos = getNextWalkablePosition(frameNode);
                if(pos) {
                  range.setEnd(pos.container, pos.offset);
                  if(wasCollapsed) {
                    range.collapse(false)
                  }
                }
              }
              selectionController.selectRange(range, shadowCursor.hasForwardSelection(), event.detail);
              eventManager.focus()
            }else {
              if(isIOS) {
                moveByMouseClickEvent(event)
              }else {
                handleMouseClickTimeoutId = runtime.setTimeout(function() {
                  moveByMouseClickEvent(event)
                }, 0)
              }
            }
          }
        }
      }
      clickCount = 0;
      clickStartedWithinCanvas = false;
      isMouseMoved = false
    }
    function handleDragStart(e) {
      var cursor = odtDocument.getCursor(inputMemberId), selectedRange = cursor.getSelectedRange();
      if(selectedRange.collapsed) {
        return
      }
      mimeDataExporter.exportRangeToDataTransfer((e.dataTransfer), selectedRange)
    }
    function handleDragEnd() {
      if(clickStartedWithinCanvas) {
        eventManager.focus()
      }
      clickCount = 0;
      clickStartedWithinCanvas = false;
      isMouseMoved = false
    }
    function handleContextMenu(e) {
      handleMouseClickEvent(e)
    }
    function handleMouseUp(event) {
      var target = (getTarget(event)), annotationNode = null;
      if(target.className === "annotationRemoveButton") {
        annotationNode = domUtils.getElementsByTagNameNS((target.parentNode), odf.Namespaces.officens, "annotation")[0];
        annotationController.removeAnnotation(annotationNode);
        eventManager.focus()
      }else {
        if(target.getAttribute("class") !== "draggable") {
          handleMouseClickEvent(event)
        }
      }
    }
    function insertNonEmptyData(e) {
      var input = e.data;
      if(input) {
        textController.insertText(input)
      }
    }
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
    function insertLocalCursor() {
      runtime.assert(session.getOdtDocument().getCursor(inputMemberId) === undefined, "Inserting local cursor a second time.");
      var op = new ops.OpAddCursor;
      op.init({memberid:inputMemberId});
      session.enqueue([op]);
      eventManager.focus()
    }
    this.insertLocalCursor = insertLocalCursor;
    function removeLocalCursor() {
      runtime.assert(session.getOdtDocument().getCursor(inputMemberId) !== undefined, "Removing local cursor without inserting before.");
      var op = new ops.OpRemoveCursor;
      op.init({memberid:inputMemberId});
      session.enqueue([op])
    }
    this.removeLocalCursor = removeLocalCursor;
    this.startEditing = function() {
      inputMethodEditor.subscribe(gui.InputMethodEditor.signalCompositionStart, textController.removeCurrentSelection);
      inputMethodEditor.subscribe(gui.InputMethodEditor.signalCompositionEnd, insertNonEmptyData);
      eventManager.subscribe("beforecut", handleBeforeCut);
      eventManager.subscribe("cut", handleCut);
      eventManager.subscribe("beforepaste", handleBeforePaste);
      eventManager.subscribe("paste", handlePaste);
      window.addEventListener("focus", hyperlinkClickHandler.showTextCursor, false);
      if(undoManager) {
        undoManager.initialize()
      }
      inputMethodEditor.setEditing(true);
      hyperlinkClickHandler.setModifier(isMacOS ? gui.HyperlinkClickHandler.Modifier.Meta : gui.HyperlinkClickHandler.Modifier.Ctrl);
      keyDownHandler.bind(keyCode.Backspace, modifier.None, returnTrue(textController.removeTextByBackspaceKey), true);
      keyDownHandler.bind(keyCode.Delete, modifier.None, textController.removeTextByDeleteKey);
      keyDownHandler.bind(keyCode.Tab, modifier.None, rangeSelectionOnly(function() {
        textController.insertText("\t");
        return true
      }));
      if(isMacOS) {
        keyDownHandler.bind(keyCode.Clear, modifier.None, textController.removeCurrentSelection);
        keyDownHandler.bind(keyCode.B, modifier.Meta, rangeSelectionOnly(directFormattingController.toggleBold));
        keyDownHandler.bind(keyCode.I, modifier.Meta, rangeSelectionOnly(directFormattingController.toggleItalic));
        keyDownHandler.bind(keyCode.U, modifier.Meta, rangeSelectionOnly(directFormattingController.toggleUnderline));
        keyDownHandler.bind(keyCode.L, modifier.MetaShift, rangeSelectionOnly(directFormattingController.alignParagraphLeft));
        keyDownHandler.bind(keyCode.E, modifier.MetaShift, rangeSelectionOnly(directFormattingController.alignParagraphCenter));
        keyDownHandler.bind(keyCode.R, modifier.MetaShift, rangeSelectionOnly(directFormattingController.alignParagraphRight));
        keyDownHandler.bind(keyCode.J, modifier.MetaShift, rangeSelectionOnly(directFormattingController.alignParagraphJustified));
        keyDownHandler.bind(keyCode.C, modifier.MetaShift, annotationController.addAnnotation);
        keyDownHandler.bind(keyCode.Z, modifier.Meta, undo);
        keyDownHandler.bind(keyCode.Z, modifier.MetaShift, redo);
        keyDownHandler.bind(keyCode.LeftMeta, modifier.Meta, hyperlinkClickHandler.showPointerCursor);
        keyDownHandler.bind(keyCode.MetaInMozilla, modifier.Meta, hyperlinkClickHandler.showPointerCursor);
        keyUpHandler.bind(keyCode.LeftMeta, modifier.None, hyperlinkClickHandler.showTextCursor);
        keyUpHandler.bind(keyCode.MetaInMozilla, modifier.None, hyperlinkClickHandler.showTextCursor)
      }else {
        keyDownHandler.bind(keyCode.B, modifier.Ctrl, rangeSelectionOnly(directFormattingController.toggleBold));
        keyDownHandler.bind(keyCode.I, modifier.Ctrl, rangeSelectionOnly(directFormattingController.toggleItalic));
        keyDownHandler.bind(keyCode.U, modifier.Ctrl, rangeSelectionOnly(directFormattingController.toggleUnderline));
        keyDownHandler.bind(keyCode.L, modifier.CtrlShift, rangeSelectionOnly(directFormattingController.alignParagraphLeft));
        keyDownHandler.bind(keyCode.E, modifier.CtrlShift, rangeSelectionOnly(directFormattingController.alignParagraphCenter));
        keyDownHandler.bind(keyCode.R, modifier.CtrlShift, rangeSelectionOnly(directFormattingController.alignParagraphRight));
        keyDownHandler.bind(keyCode.J, modifier.CtrlShift, rangeSelectionOnly(directFormattingController.alignParagraphJustified));
        keyDownHandler.bind(keyCode.C, modifier.CtrlAlt, annotationController.addAnnotation);
        keyDownHandler.bind(keyCode.Z, modifier.Ctrl, undo);
        keyDownHandler.bind(keyCode.Z, modifier.CtrlShift, redo);
        keyDownHandler.bind(keyCode.Ctrl, modifier.Ctrl, hyperlinkClickHandler.showPointerCursor);
        keyUpHandler.bind(keyCode.Ctrl, modifier.None, hyperlinkClickHandler.showTextCursor)
      }
      function handler(e) {
        var text = stringFromKeyPress(e);
        if(text && !(e.altKey || (e.ctrlKey || e.metaKey))) {
          textController.insertText(text);
          return true
        }
        return false
      }
      keyPressHandler.setDefault(rangeSelectionOnly(handler));
      keyPressHandler.bind(keyCode.Enter, modifier.None, rangeSelectionOnly(textController.enqueueParagraphSplittingOps))
    };
    this.endEditing = function() {
      inputMethodEditor.unsubscribe(gui.InputMethodEditor.signalCompositionStart, textController.removeCurrentSelection);
      inputMethodEditor.unsubscribe(gui.InputMethodEditor.signalCompositionEnd, insertNonEmptyData);
      eventManager.unsubscribe("cut", handleCut);
      eventManager.unsubscribe("beforecut", handleBeforeCut);
      eventManager.unsubscribe("paste", handlePaste);
      eventManager.unsubscribe("beforepaste", handleBeforePaste);
      window.removeEventListener("focus", hyperlinkClickHandler.showTextCursor, false);
      inputMethodEditor.setEditing(false);
      hyperlinkClickHandler.setModifier(gui.HyperlinkClickHandler.Modifier.None);
      keyDownHandler.bind(keyCode.Backspace, modifier.None, function() {
        return true
      }, true);
      keyDownHandler.unbind(keyCode.Delete, modifier.None);
      keyDownHandler.unbind(keyCode.Tab, modifier.None);
      if(isMacOS) {
        keyDownHandler.unbind(keyCode.Clear, modifier.None);
        keyDownHandler.unbind(keyCode.B, modifier.Meta);
        keyDownHandler.unbind(keyCode.I, modifier.Meta);
        keyDownHandler.unbind(keyCode.U, modifier.Meta);
        keyDownHandler.unbind(keyCode.L, modifier.MetaShift);
        keyDownHandler.unbind(keyCode.E, modifier.MetaShift);
        keyDownHandler.unbind(keyCode.R, modifier.MetaShift);
        keyDownHandler.unbind(keyCode.J, modifier.MetaShift);
        keyDownHandler.unbind(keyCode.C, modifier.MetaShift);
        keyDownHandler.unbind(keyCode.Z, modifier.Meta);
        keyDownHandler.unbind(keyCode.Z, modifier.MetaShift);
        keyDownHandler.unbind(keyCode.LeftMeta, modifier.Meta);
        keyDownHandler.unbind(keyCode.MetaInMozilla, modifier.Meta);
        keyUpHandler.unbind(keyCode.LeftMeta, modifier.None);
        keyUpHandler.unbind(keyCode.MetaInMozilla, modifier.None)
      }else {
        keyDownHandler.unbind(keyCode.B, modifier.Ctrl);
        keyDownHandler.unbind(keyCode.I, modifier.Ctrl);
        keyDownHandler.unbind(keyCode.U, modifier.Ctrl);
        keyDownHandler.unbind(keyCode.L, modifier.CtrlShift);
        keyDownHandler.unbind(keyCode.E, modifier.CtrlShift);
        keyDownHandler.unbind(keyCode.R, modifier.CtrlShift);
        keyDownHandler.unbind(keyCode.J, modifier.CtrlShift);
        keyDownHandler.unbind(keyCode.C, modifier.CtrlAlt);
        keyDownHandler.unbind(keyCode.Z, modifier.Ctrl);
        keyDownHandler.unbind(keyCode.Z, modifier.CtrlShift);
        keyDownHandler.unbind(keyCode.Ctrl, modifier.Ctrl);
        keyUpHandler.unbind(keyCode.Ctrl, modifier.None)
      }
      keyPressHandler.setDefault(null);
      keyPressHandler.unbind(keyCode.Enter, modifier.None)
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
        undoManager.setDocument(odtDocument);
        undoManager.setPlaybackFunction(session.enqueue);
        undoManager.subscribe(gui.UndoManager.signalUndoStackChanged, forwardUndoStackChange)
      }
    };
    this.getUndoManager = function() {
      return undoManager
    };
    this.getAnnotationController = function() {
      return annotationController
    };
    this.getDirectFormattingController = function() {
      return directFormattingController
    };
    this.getHyperlinkController = function() {
      return hyperlinkController
    };
    this.getImageController = function() {
      return imageController
    };
    this.getSelectionController = function() {
      return selectionController
    };
    this.getTextController = function() {
      return textController
    };
    this.getEventManager = function() {
      return eventManager
    };
    this.getKeyboardHandlers = function() {
      return{keydown:keyDownHandler, keypress:keyPressHandler}
    };
    function destroy(callback) {
      eventManager.unsubscribe("keydown", keyDownHandler.handleEvent);
      eventManager.unsubscribe("keypress", keyPressHandler.handleEvent);
      eventManager.unsubscribe("keyup", keyUpHandler.handleEvent);
      eventManager.unsubscribe("copy", handleCopy);
      eventManager.unsubscribe("mousedown", handleMouseDown);
      eventManager.unsubscribe("mousemove", drawShadowCursorTask.trigger);
      eventManager.unsubscribe("mouseup", handleMouseUp);
      eventManager.unsubscribe("contextmenu", handleContextMenu);
      eventManager.unsubscribe("dragstart", handleDragStart);
      eventManager.unsubscribe("dragend", handleDragEnd);
      eventManager.unsubscribe("click", hyperlinkClickHandler.handleClick);
      eventManager.unsubscribe("longpress", selectWordByLongPress);
      eventManager.unsubscribe("drag", extendSelectionByDrag);
      eventManager.unsubscribe("dragstop", updateCursorSelection);
      odtDocument.unsubscribe(ops.OdtDocument.signalOperationEnd, redrawRegionSelectionTask.trigger);
      odtDocument.unsubscribe(ops.Document.signalCursorAdded, inputMethodEditor.registerCursor);
      odtDocument.unsubscribe(ops.Document.signalCursorRemoved, inputMethodEditor.removeCursor);
      odtDocument.unsubscribe(ops.OdtDocument.signalOperationEnd, updateUndoStack);
      callback()
    }
    this.destroy = function(callback) {
      var destroyCallbacks = [];
      if(iOSSafariSupport) {
        destroyCallbacks.push(iOSSafariSupport.destroy)
      }
      destroyCallbacks = destroyCallbacks.concat([drawShadowCursorTask.destroy, redrawRegionSelectionTask.destroy, directFormattingController.destroy, inputMethodEditor.destroy, eventManager.destroy, destroy]);
      runtime.clearTimeout(handleMouseClickTimeoutId);
      async.destroyAll(destroyCallbacks, callback)
    };
    function init() {
      drawShadowCursorTask = new core.ScheduledTask(updateShadowCursor, 0);
      redrawRegionSelectionTask = new core.ScheduledTask(redrawRegionSelection, 0);
      keyDownHandler.bind(keyCode.Left, modifier.None, rangeSelectionOnly(selectionController.moveCursorToLeft));
      keyDownHandler.bind(keyCode.Right, modifier.None, rangeSelectionOnly(selectionController.moveCursorToRight));
      keyDownHandler.bind(keyCode.Up, modifier.None, rangeSelectionOnly(selectionController.moveCursorUp));
      keyDownHandler.bind(keyCode.Down, modifier.None, rangeSelectionOnly(selectionController.moveCursorDown));
      keyDownHandler.bind(keyCode.Left, modifier.Shift, rangeSelectionOnly(selectionController.extendSelectionToLeft));
      keyDownHandler.bind(keyCode.Right, modifier.Shift, rangeSelectionOnly(selectionController.extendSelectionToRight));
      keyDownHandler.bind(keyCode.Up, modifier.Shift, rangeSelectionOnly(selectionController.extendSelectionUp));
      keyDownHandler.bind(keyCode.Down, modifier.Shift, rangeSelectionOnly(selectionController.extendSelectionDown));
      keyDownHandler.bind(keyCode.Home, modifier.None, rangeSelectionOnly(selectionController.moveCursorToLineStart));
      keyDownHandler.bind(keyCode.End, modifier.None, rangeSelectionOnly(selectionController.moveCursorToLineEnd));
      keyDownHandler.bind(keyCode.Home, modifier.Ctrl, rangeSelectionOnly(selectionController.moveCursorToDocumentStart));
      keyDownHandler.bind(keyCode.End, modifier.Ctrl, rangeSelectionOnly(selectionController.moveCursorToDocumentEnd));
      keyDownHandler.bind(keyCode.Home, modifier.Shift, rangeSelectionOnly(selectionController.extendSelectionToLineStart));
      keyDownHandler.bind(keyCode.End, modifier.Shift, rangeSelectionOnly(selectionController.extendSelectionToLineEnd));
      keyDownHandler.bind(keyCode.Up, modifier.CtrlShift, rangeSelectionOnly(selectionController.extendSelectionToParagraphStart));
      keyDownHandler.bind(keyCode.Down, modifier.CtrlShift, rangeSelectionOnly(selectionController.extendSelectionToParagraphEnd));
      keyDownHandler.bind(keyCode.Home, modifier.CtrlShift, rangeSelectionOnly(selectionController.extendSelectionToDocumentStart));
      keyDownHandler.bind(keyCode.End, modifier.CtrlShift, rangeSelectionOnly(selectionController.extendSelectionToDocumentEnd));
      if(isMacOS) {
        keyDownHandler.bind(keyCode.Left, modifier.Alt, rangeSelectionOnly(selectionController.moveCursorBeforeWord));
        keyDownHandler.bind(keyCode.Right, modifier.Alt, rangeSelectionOnly(selectionController.moveCursorPastWord));
        keyDownHandler.bind(keyCode.Left, modifier.Meta, rangeSelectionOnly(selectionController.moveCursorToLineStart));
        keyDownHandler.bind(keyCode.Right, modifier.Meta, rangeSelectionOnly(selectionController.moveCursorToLineEnd));
        keyDownHandler.bind(keyCode.Home, modifier.Meta, rangeSelectionOnly(selectionController.moveCursorToDocumentStart));
        keyDownHandler.bind(keyCode.End, modifier.Meta, rangeSelectionOnly(selectionController.moveCursorToDocumentEnd));
        keyDownHandler.bind(keyCode.Left, modifier.AltShift, rangeSelectionOnly(selectionController.extendSelectionBeforeWord));
        keyDownHandler.bind(keyCode.Right, modifier.AltShift, rangeSelectionOnly(selectionController.extendSelectionPastWord));
        keyDownHandler.bind(keyCode.Left, modifier.MetaShift, rangeSelectionOnly(selectionController.extendSelectionToLineStart));
        keyDownHandler.bind(keyCode.Right, modifier.MetaShift, rangeSelectionOnly(selectionController.extendSelectionToLineEnd));
        keyDownHandler.bind(keyCode.Up, modifier.AltShift, rangeSelectionOnly(selectionController.extendSelectionToParagraphStart));
        keyDownHandler.bind(keyCode.Down, modifier.AltShift, rangeSelectionOnly(selectionController.extendSelectionToParagraphEnd));
        keyDownHandler.bind(keyCode.Up, modifier.MetaShift, rangeSelectionOnly(selectionController.extendSelectionToDocumentStart));
        keyDownHandler.bind(keyCode.Down, modifier.MetaShift, rangeSelectionOnly(selectionController.extendSelectionToDocumentEnd));
        keyDownHandler.bind(keyCode.A, modifier.Meta, rangeSelectionOnly(selectionController.extendSelectionToEntireDocument))
      }else {
        keyDownHandler.bind(keyCode.Left, modifier.Ctrl, rangeSelectionOnly(selectionController.moveCursorBeforeWord));
        keyDownHandler.bind(keyCode.Right, modifier.Ctrl, rangeSelectionOnly(selectionController.moveCursorPastWord));
        keyDownHandler.bind(keyCode.Left, modifier.CtrlShift, rangeSelectionOnly(selectionController.extendSelectionBeforeWord));
        keyDownHandler.bind(keyCode.Right, modifier.CtrlShift, rangeSelectionOnly(selectionController.extendSelectionPastWord));
        keyDownHandler.bind(keyCode.A, modifier.Ctrl, rangeSelectionOnly(selectionController.extendSelectionToEntireDocument))
      }
      if(isIOS) {
        iOSSafariSupport = new gui.IOSSafariSupport(eventManager)
      }
      eventManager.subscribe("keydown", keyDownHandler.handleEvent);
      eventManager.subscribe("keypress", keyPressHandler.handleEvent);
      eventManager.subscribe("keyup", keyUpHandler.handleEvent);
      eventManager.subscribe("copy", handleCopy);
      eventManager.subscribe("mousedown", handleMouseDown);
      eventManager.subscribe("mousemove", drawShadowCursorTask.trigger);
      eventManager.subscribe("mouseup", handleMouseUp);
      eventManager.subscribe("contextmenu", handleContextMenu);
      eventManager.subscribe("dragstart", handleDragStart);
      eventManager.subscribe("dragend", handleDragEnd);
      eventManager.subscribe("click", hyperlinkClickHandler.handleClick);
      eventManager.subscribe("longpress", selectWordByLongPress);
      eventManager.subscribe("drag", extendSelectionByDrag);
      eventManager.subscribe("dragstop", updateCursorSelection);
      odtDocument.subscribe(ops.OdtDocument.signalOperationEnd, redrawRegionSelectionTask.trigger);
      odtDocument.subscribe(ops.Document.signalCursorAdded, inputMethodEditor.registerCursor);
      odtDocument.subscribe(ops.Document.signalCursorRemoved, inputMethodEditor.removeCursor);
      odtDocument.subscribe(ops.OdtDocument.signalOperationEnd, updateUndoStack)
    }
    init()
  };
  return gui.SessionController
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
gui.CaretManager = function CaretManager(sessionController) {
  var carets = {}, async = new core.Async, window = runtime.getWindow(), ensureCaretVisibleTimeoutId, scrollIntoViewScheduled = false;
  function getCaret(memberId) {
    return carets.hasOwnProperty(memberId) ? carets[memberId] : null
  }
  function getCarets() {
    return Object.keys(carets).map(function(memberid) {
      return carets[memberid]
    })
  }
  function removeCaret(memberId) {
    var caret = carets[memberId];
    if(caret) {
      caret.destroy(function() {
      });
      delete carets[memberId]
    }
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
        ensureCaretVisibleTimeoutId = runtime.setTimeout(executeEnsureCaretVisible, 50)
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
    var memberid = cursor.getMemberId(), caret = new gui.Caret(cursor, caretAvatarInitiallyVisible, blinkOnRangeSelect), eventManager = sessionController.getEventManager();
    carets[memberid] = caret;
    if(memberid === sessionController.getInputMemberId()) {
      runtime.log("Starting to track input on new cursor of " + memberid);
      cursor.subscribe(ops.OdtCursor.signalCursorUpdated, scheduleCaretVisibilityCheck);
      caret.setOverlayElement(eventManager.getEventTrap())
    }else {
      cursor.subscribe(ops.OdtCursor.signalCursorUpdated, caret.handleUpdate)
    }
    return caret
  };
  this.getCaret = getCaret;
  this.getCarets = getCarets;
  this.destroy = function(callback) {
    var odtDocument = sessionController.getSession().getOdtDocument(), eventManager = sessionController.getEventManager(), caretCleanup = getCarets().map(function(caret) {
      return caret.destroy
    });
    runtime.clearTimeout(ensureCaretVisibleTimeoutId);
    odtDocument.unsubscribe(ops.OdtDocument.signalParagraphChanged, ensureLocalCaretVisible);
    odtDocument.unsubscribe(ops.Document.signalCursorMoved, refreshLocalCaretBlinking);
    odtDocument.unsubscribe(ops.Document.signalCursorRemoved, removeCaret);
    eventManager.unsubscribe("focus", focusLocalCaret);
    eventManager.unsubscribe("blur", blurLocalCaret);
    window.removeEventListener("focus", showLocalCaret, false);
    window.removeEventListener("blur", hideLocalCaret, false);
    carets = {};
    async.destroyAll(caretCleanup, callback)
  };
  function init() {
    var odtDocument = sessionController.getSession().getOdtDocument(), eventManager = sessionController.getEventManager();
    odtDocument.subscribe(ops.OdtDocument.signalParagraphChanged, ensureLocalCaretVisible);
    odtDocument.subscribe(ops.Document.signalCursorMoved, refreshLocalCaretBlinking);
    odtDocument.subscribe(ops.Document.signalCursorRemoved, removeCaret);
    eventManager.subscribe("focus", focusLocalCaret);
    eventManager.subscribe("blur", blurLocalCaret);
    window.addEventListener("focus", showLocalCaret, false);
    window.addEventListener("blur", hideLocalCaret, false)
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
    var editInfons = "urn:webodf:names:editinfo", dom = odtDocument.getDOMDocument();
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
gui.EditInfoMarker = function EditInfoMarker(editInfo, initialVisibility) {
  var self = this, editInfoNode, handle, marker, editinfons = "urn:webodf:names:editinfo", decayTimer0, decayTimer1, decayTimer2, decayTimeStep = 1E4;
  function applyDecay(opacity, delay) {
    return runtime.setTimeout(function() {
      marker.style.opacity = opacity
    }, delay)
  }
  function deleteDecay(timerId) {
    runtime.clearTimeout(timerId)
  }
  function setLastAuthor(memberid) {
    marker.setAttributeNS(editinfons, "editinfo:memberid", memberid)
  }
  this.addEdit = function(memberid, timestamp) {
    var age = Date.now() - timestamp;
    editInfo.addEdit(memberid, timestamp);
    handle.setEdits(editInfo.getSortedEdits());
    setLastAuthor(memberid);
    deleteDecay(decayTimer1);
    deleteDecay(decayTimer2);
    if(age < decayTimeStep) {
      decayTimer0 = applyDecay(1, 0);
      decayTimer1 = applyDecay(0.5, decayTimeStep - age);
      decayTimer2 = applyDecay(0.2, decayTimeStep * 2 - age)
    }else {
      if(age >= decayTimeStep && age < decayTimeStep * 2) {
        decayTimer0 = applyDecay(0.5, 0);
        decayTimer2 = applyDecay(0.2, decayTimeStep * 2 - age)
      }else {
        decayTimer0 = applyDecay(0.2, 0)
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
    deleteDecay(decayTimer0);
    deleteDecay(decayTimer1);
    deleteDecay(decayTimer2);
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
    var dom = editInfo.getOdtDocument().getDOMDocument(), htmlns = dom.documentElement.namespaceURI;
    marker = (dom.createElementNS(htmlns, "div"));
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
gui.ShadowCursor = function ShadowCursor(document) {
  var selectedRange = (document.getDOMDocument().createRange()), forwardSelection = true;
  this.removeFromDocument = function() {
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
  this.getDocument = function() {
    return document
  };
  this.getSelectionType = function() {
    return ops.OdtCursor.RangeSelection
  };
  function init() {
    selectedRange.setStart(document.getRootNode(), 0)
  }
  init()
};
gui.ShadowCursor.ShadowCursorMemberId = "";
(function() {
  return gui.ShadowCursor
})();
gui.SelectionView = function SelectionView(cursor) {
};
gui.SelectionView.prototype.rerender = function() {
};
gui.SelectionView.prototype.show = function() {
};
gui.SelectionView.prototype.hide = function() {
};
gui.SelectionView.prototype.destroy = function(callback) {
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
gui.SelectionViewManager = function SelectionViewManager(SelectionView) {
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
      selectionViews[memberId].rerender()
    })
  };
  this.registerCursor = function(cursor, virtualSelectionsInitiallyVisible) {
    var memberId = cursor.getMemberId(), selectionView = new SelectionView(cursor);
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
    function destroySelectionView(i, err) {
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
    }
    destroySelectionView(0, undefined)
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
gui.SessionViewOptions = function() {
  this.editInfoMarkersInitiallyVisible = true;
  this.caretAvatarsInitiallyVisible = true;
  this.caretBlinksOnRangeSelect = true
};
(function() {
  function configOption(userValue, defaultValue) {
    return userValue !== undefined ? Boolean(userValue) : defaultValue
  }
  gui.SessionView = function SessionView(viewOptions, localMemberId, session, caretManager, selectionViewManager) {
    var avatarInfoStyles, editInfons = "urn:webodf:names:editinfo", editInfoMap = {}, showEditInfoMarkers = configOption(viewOptions.editInfoMarkersInitiallyVisible, true), showCaretAvatars = configOption(viewOptions.caretAvatarsInitiallyVisible, true), blinkOnRangeSelect = configOption(viewOptions.caretBlinksOnRangeSelect, true);
    function createAvatarInfoNodeMatch(nodeName, memberId, pseudoClass) {
      return nodeName + '[editinfo|memberid="' + memberId + '"]' + pseudoClass
    }
    function getAvatarInfoStyle(nodeName, memberId, pseudoClass) {
      var node = avatarInfoStyles.firstChild, nodeMatch = createAvatarInfoNodeMatch(nodeName, memberId, pseudoClass) + "{";
      while(node) {
        if(node.nodeType === Node.TEXT_NODE && (node).data.indexOf(nodeMatch) === 0) {
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
      setStyle(".selectionOverlay", "{ fill: " + color + "; stroke: " + color + ";}", "");
      if(memberId === gui.ShadowCursor.ShadowCursorMemberId || memberId === localMemberId) {
        setStyle(".webodf-touchEnabled .selectionOverlay", "{ display: block; }", " > .draggable")
      }
    }
    function highlightEdit(element, memberId, timestamp) {
      var editInfo, editInfoMarker, id = "", editInfoNode = element.getElementsByTagNameNS(editInfons, "editinfo").item(0);
      if(editInfoNode) {
        id = (editInfoNode).getAttributeNS(editInfons, "id");
        editInfoMarker = editInfoMap[id]
      }else {
        id = Math.random().toString();
        editInfo = new ops.EditInfo(element, session.getOdtDocument());
        editInfoMarker = new gui.EditInfoMarker(editInfo, showEditInfoMarkers);
        editInfoNode = (element.getElementsByTagNameNS(editInfons, "editinfo").item(0));
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
    this.destroy = function(callback) {
      var odtDocument = session.getOdtDocument(), editInfoArray = Object.keys(editInfoMap).map(function(keyname) {
        return editInfoMap[keyname]
      });
      odtDocument.unsubscribe(ops.Document.signalMemberAdded, renderMemberData);
      odtDocument.unsubscribe(ops.Document.signalMemberUpdated, renderMemberData);
      odtDocument.unsubscribe(ops.Document.signalCursorAdded, onCursorAdded);
      odtDocument.unsubscribe(ops.Document.signalCursorRemoved, onCursorRemoved);
      odtDocument.unsubscribe(ops.OdtDocument.signalParagraphChanged, onParagraphChanged);
      odtDocument.unsubscribe(ops.Document.signalCursorMoved, onCursorMoved);
      odtDocument.unsubscribe(ops.OdtDocument.signalParagraphChanged, selectionViewManager.rerenderSelectionViews);
      odtDocument.unsubscribe(ops.OdtDocument.signalTableAdded, selectionViewManager.rerenderSelectionViews);
      odtDocument.unsubscribe(ops.OdtDocument.signalParagraphStyleModified, selectionViewManager.rerenderSelectionViews);
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
      var odtDocument = session.getOdtDocument(), head = document.getElementsByTagName("head").item(0);
      odtDocument.subscribe(ops.Document.signalMemberAdded, renderMemberData);
      odtDocument.subscribe(ops.Document.signalMemberUpdated, renderMemberData);
      odtDocument.subscribe(ops.Document.signalCursorAdded, onCursorAdded);
      odtDocument.subscribe(ops.Document.signalCursorRemoved, onCursorRemoved);
      odtDocument.subscribe(ops.OdtDocument.signalParagraphChanged, onParagraphChanged);
      odtDocument.subscribe(ops.Document.signalCursorMoved, onCursorMoved);
      odtDocument.subscribe(ops.OdtDocument.signalParagraphChanged, selectionViewManager.rerenderSelectionViews);
      odtDocument.subscribe(ops.OdtDocument.signalTableAdded, selectionViewManager.rerenderSelectionViews);
      odtDocument.subscribe(ops.OdtDocument.signalParagraphStyleModified, selectionViewManager.rerenderSelectionViews);
      avatarInfoStyles = (document.createElementNS(head.namespaceURI, "style"));
      avatarInfoStyles.type = "text/css";
      avatarInfoStyles.media = "screen, print, handheld, projection";
      avatarInfoStyles.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));
      avatarInfoStyles.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));
      head.appendChild(avatarInfoStyles)
    }
    init()
  }
})();
gui.SvgSelectionView = function SvgSelectionView(cursor) {
  var document = cursor.getDocument(), documentRoot, root, doc = document.getDOMDocument(), async = new core.Async, svgns = "http://www.w3.org/2000/svg", overlay = doc.createElementNS(svgns, "svg"), polygon = doc.createElementNS(svgns, "polygon"), handle1 = doc.createElementNS(svgns, "circle"), handle2 = doc.createElementNS(svgns, "circle"), odfUtils = new odf.OdfUtils, domUtils = new core.DomUtils, zoomHelper = document.getCanvas().getZoomHelper(), isVisible = true, positionIterator = gui.SelectionMover.createPositionIterator(document.getRootNode()), 
  FILTER_ACCEPT = NodeFilter.FILTER_ACCEPT, FILTER_REJECT = NodeFilter.FILTER_REJECT, HANDLE_RADIUS = 8, renderTask;
  function addOverlay() {
    var newDocumentRoot = document.getRootNode();
    if(documentRoot !== newDocumentRoot) {
      documentRoot = newDocumentRoot;
      root = (documentRoot.parentNode.parentNode.parentNode);
      root.appendChild(overlay);
      overlay.setAttribute("class", "selectionOverlay");
      handle1.setAttribute("class", "draggable");
      handle2.setAttribute("class", "draggable");
      handle1.setAttribute("end", "left");
      handle2.setAttribute("end", "right");
      handle1.setAttribute("r", HANDLE_RADIUS);
      handle2.setAttribute("r", HANDLE_RADIUS);
      overlay.appendChild(polygon);
      overlay.appendChild(handle1);
      overlay.appendChild(handle2)
    }
  }
  function translateRect(rect) {
    var rootRect = domUtils.getBoundingClientRect(root), zoomLevel = zoomHelper.getZoomLevel(), resultRect = {};
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
    var nextNodeIndex = nodes.length - 1, node = nodes[nextNodeIndex], startOffset, endOffset;
    if(range.endContainer === node) {
      startOffset = range.endOffset
    }else {
      if(node.nodeType === Node.TEXT_NODE) {
        startOffset = node.length
      }else {
        startOffset = node.childNodes.length
      }
    }
    endOffset = startOffset;
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
    rootFilter = document.createRootFilter(firstNode);
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
        range.setEnd(currentNode, currentNode === lastSibling ? lastOffset : (currentNode).length);
        currentRect = range.getBoundingClientRect();
        grownRect = checkAndGrowOrCreateRect(grownRect, currentRect)
      }else {
        treeWalker = doc.createTreeWalker(firstSibling, NodeFilter.SHOW_TEXT, acceptNode, false);
        currentNode = treeWalker.currentNode = firstNode;
        while(currentNode && currentNode !== lastNode) {
          range.setStart(currentNode, firstOffset);
          range.setEnd(currentNode, (currentNode).length);
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
            lastOffset = (currentNode).length
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
  function setPoints(points) {
    var pointsString = "", i;
    for(i = 0;i < points.length;i += 1) {
      pointsString += points[i].x + "," + points[i].y + " "
    }
    polygon.setAttribute("points", pointsString)
  }
  function repositionOverlays(selectedRange) {
    var extremes = getExtremeRanges(selectedRange), firstRange, lastRange, fillerRange, firstRect, fillerRect, lastRect, left, right, top, bottom;
    if(extremes) {
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
      left = fillerRect.left;
      right = firstRect.left + Math.max(0, fillerRect.width - (firstRect.left - fillerRect.left));
      top = Math.min(firstRect.top, lastRect.top);
      bottom = lastRect.top + lastRect.height;
      setPoints([{x:firstRect.left, y:top + firstRect.height}, {x:firstRect.left, y:top}, {x:right, y:top}, {x:right, y:bottom - lastRect.height}, {x:lastRect.right, y:bottom - lastRect.height}, {x:lastRect.right, y:bottom}, {x:left, y:bottom}, {x:left, y:top + firstRect.height}, {x:firstRect.left, y:top + firstRect.height}]);
      handle1.setAttribute("cx", firstRect.left);
      handle1.setAttribute("cy", top + firstRect.height / 2);
      handle2.setAttribute("cx", lastRect.right);
      handle2.setAttribute("cy", bottom - lastRect.height / 2);
      firstRange.detach();
      lastRange.detach();
      fillerRange.detach()
    }
    return Boolean(extremes)
  }
  function rerender() {
    var range = cursor.getSelectedRange(), shouldShow;
    shouldShow = isVisible && (cursor.getSelectionType() === ops.OdtCursor.RangeSelection && !range.collapsed);
    if(shouldShow) {
      addOverlay();
      shouldShow = repositionOverlays(range)
    }
    if(shouldShow) {
      overlay.style.display = "block"
    }else {
      overlay.style.display = "none"
    }
  }
  this.rerender = function() {
    if(isVisible) {
      renderTask.trigger()
    }
  };
  this.show = function() {
    isVisible = true;
    renderTask.trigger()
  };
  this.hide = function() {
    isVisible = false;
    renderTask.trigger()
  };
  function handleCursorMove(movedCursor) {
    if(isVisible && movedCursor === cursor) {
      renderTask.trigger()
    }
  }
  function scaleHandles(zoomLevel) {
    var radius = HANDLE_RADIUS / zoomLevel;
    handle1.setAttribute("r", radius);
    handle2.setAttribute("r", radius)
  }
  function destroy(callback) {
    root.removeChild(overlay);
    cursor.getDocument().unsubscribe(ops.Document.signalCursorMoved, handleCursorMove);
    zoomHelper.unsubscribe(gui.ZoomHelper.signalZoomChanged, scaleHandles);
    callback()
  }
  this.destroy = function(callback) {
    async.destroyAll([renderTask.destroy, destroy], callback)
  };
  function init() {
    var editinfons = "urn:webodf:names:editinfo", memberid = cursor.getMemberId();
    renderTask = new core.ScheduledTask(rerender, 0);
    addOverlay();
    overlay.setAttributeNS(editinfons, "editinfo:memberid", memberid);
    cursor.getDocument().subscribe(ops.Document.signalCursorMoved, handleCursorMove);
    zoomHelper.subscribe(gui.ZoomHelper.signalZoomChanged, scaleHandles);
    scaleHandles(zoomHelper.getZoomLevel())
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
gui.UndoStateRules = function UndoStateRules() {
  function ReverseIterator(array, predicate) {
    var index = array.length;
    this.previous = function() {
      for(index = index - 1;index >= 0;index -= 1) {
        if(predicate(array[index])) {
          return array[index]
        }
      }
      return null
    }
  }
  function getOpType(op) {
    return op.spec().optype
  }
  function getOpPosition(op) {
    var key = "position", spec = op.spec(), value;
    if(spec.hasOwnProperty(key)) {
      value = (spec[key])
    }
    return value
  }
  function isEditOperation(op) {
    return op.isEdit
  }
  this.isEditOperation = isEditOperation;
  function canAggregateOperation(op) {
    switch(getOpType(op)) {
      case "RemoveText":
      ;
      case "InsertText":
        return true;
      default:
        return false
    }
  }
  function isSameDirectionOfTravel(thisOp, lastEditOp, secondLastEditOp) {
    var thisPosition = getOpPosition(thisOp), lastPosition = getOpPosition(lastEditOp), secondLastPosition = getOpPosition(secondLastEditOp), diffLastToSecondLast = lastPosition - secondLastPosition, diffThisToLast = thisPosition - lastPosition;
    return diffThisToLast === diffLastToSecondLast
  }
  function isAdjacentOperation(thisOp, lastEditOp) {
    var positionDifference = getOpPosition(thisOp) - getOpPosition(lastEditOp);
    return positionDifference === 0 || Math.abs(positionDifference) === 1
  }
  function continuesOperations(thisOp, lastEditOp, secondLastEditOp) {
    if(!secondLastEditOp) {
      return isAdjacentOperation(thisOp, lastEditOp)
    }
    return isSameDirectionOfTravel(thisOp, lastEditOp, secondLastEditOp)
  }
  function continuesMostRecentEditOperation(thisOp, recentOperations) {
    var thisOpType = getOpType(thisOp), editOpsFinder = new ReverseIterator(recentOperations, isEditOperation), lastEditOp = editOpsFinder.previous();
    runtime.assert(Boolean(lastEditOp), "No edit operations found in state");
    if(thisOpType === getOpType((lastEditOp))) {
      return continuesOperations(thisOp, (lastEditOp), editOpsFinder.previous())
    }
    return false
  }
  function continuesMostRecentEditGroup(thisOp, recentOperations) {
    var thisOpType = getOpType(thisOp), editOpsFinder = new ReverseIterator(recentOperations, isEditOperation), candidateOp = editOpsFinder.previous(), lastEditOp, secondLastEditOp = null, inspectedGroupsCount, groupId;
    runtime.assert(Boolean(candidateOp), "No edit operations found in state");
    groupId = candidateOp.group;
    runtime.assert(groupId !== undefined, "Operation has no group");
    inspectedGroupsCount = 1;
    while(candidateOp && candidateOp.group === groupId) {
      if(thisOpType === getOpType(candidateOp)) {
        lastEditOp = candidateOp;
        break
      }
      candidateOp = editOpsFinder.previous()
    }
    if(lastEditOp) {
      candidateOp = editOpsFinder.previous();
      while(candidateOp) {
        if(candidateOp.group !== groupId) {
          if(inspectedGroupsCount === 2) {
            break
          }
          groupId = candidateOp.group;
          inspectedGroupsCount += 1
        }
        if(thisOpType === getOpType(candidateOp)) {
          secondLastEditOp = candidateOp;
          break
        }
        candidateOp = editOpsFinder.previous()
      }
      return continuesOperations(thisOp, (lastEditOp), secondLastEditOp)
    }
    return false
  }
  function isPartOfOperationSet(operation, recentOperations) {
    var areOperationsGrouped = operation.group !== undefined, lastOperation;
    if(!isEditOperation(operation)) {
      return true
    }
    if(recentOperations.length === 0) {
      return true
    }
    lastOperation = recentOperations[recentOperations.length - 1];
    if(areOperationsGrouped && operation.group === lastOperation.group) {
      return true
    }
    if(canAggregateOperation(operation) && recentOperations.some(isEditOperation)) {
      if(areOperationsGrouped) {
        return continuesMostRecentEditGroup(operation, recentOperations)
      }
      return continuesMostRecentEditOperation(operation, recentOperations)
    }
    return false
  }
  this.isPartOfOperationSet = isPartOfOperationSet
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
gui.TrivialUndoManager = function TrivialUndoManager(defaultRules) {
  var self = this, cursorns = "urn:webodf:names:cursor", domUtils = new core.DomUtils, initialDoc, initialState = [], playFunc, document, currentUndoState = [], undoStates = [], redoStates = [], eventNotifier = new core.EventNotifier([gui.UndoManager.signalUndoStackChanged, gui.UndoManager.signalUndoStateCreated, gui.UndoManager.signalUndoStateModified, gui.TrivialUndoManager.signalDocumentRootReplaced]), undoRules = defaultRules || new gui.UndoStateRules, isExecutingOps = false;
  function executeOperations(operations) {
    if(operations.length > 0) {
      isExecutingOps = true;
      playFunc(operations);
      isExecutingOps = false
    }
  }
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
    document.getMemberIds().forEach(function(memberid) {
      requiredAddOps[memberid] = true
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
  this.setDocument = function(newDocument) {
    document = newDocument
  };
  this.purgeInitialState = function() {
    undoStates.length = 0;
    redoStates.length = 0;
    initialState.length = 0;
    currentUndoState.length = 0;
    initialDoc = null;
    emitStackChange()
  };
  function setInitialState() {
    initialDoc = document.cloneDocumentElement();
    removeCursors(initialDoc);
    completeCurrentUndoState();
    currentUndoState = initialState = extractCursorStates([initialState].concat(undoStates));
    undoStates.length = 0;
    redoStates.length = 0;
    emitStackChange()
  }
  this.setInitialState = setInitialState;
  this.initialize = function() {
    if(!initialDoc) {
      setInitialState()
    }
  };
  this.setPlaybackFunction = function(playback_func) {
    playFunc = playback_func
  };
  this.onOperationExecuted = function(op) {
    if(isExecutingOps) {
      return
    }
    if(undoRules.isEditOperation(op) && (currentUndoState === initialState || redoStates.length > 0) || !undoRules.isPartOfOperationSet(op, currentUndoState)) {
      redoStates.length = 0;
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
      executeOperations(redoOperations);
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
    var moved = 0;
    while(states && undoStates.length) {
      redoStates.push(undoStates.pop());
      states -= 1;
      moved += 1
    }
    if(moved) {
      document.setDocumentElement((initialDoc.cloneNode(true)));
      eventNotifier.emit(gui.TrivialUndoManager.signalDocumentRootReplaced, {});
      document.getMemberIds().forEach(function(memberid) {
        document.removeCursor(memberid)
      });
      executeOperations(initialState);
      undoStates.forEach(executeOperations);
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
    function check(attributeName) {
      if(setProperties[attributeName] === styleName) {
        attributes.push(attributeName)
      }
    }
    if(setProperties) {
      ["style:parent-style-name", "style:next-style-name"].forEach(check)
    }
    return attributes
  }
  function dropStyleReferencingAttributes(setProperties, deletedStyleName) {
    function del(attributeName) {
      if(setProperties[attributeName] === deletedStyleName) {
        delete setProperties[attributeName]
      }
    }
    if(setProperties) {
      ["style:parent-style-name", "style:next-style-name"].forEach(del)
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
    var i, name, majorChanged = false, minorChanged = false, removedPropertyNames, majorRemovedPropertyNames = [];
    if(majorRemovedProperties && majorRemovedProperties.attributes) {
      majorRemovedPropertyNames = majorRemovedProperties.attributes.split(",")
    }
    if(minorSetProperties && (majorSetProperties || majorRemovedPropertyNames.length > 0)) {
      Object.keys(minorSetProperties).forEach(function(key) {
        var value = minorSetProperties[key], overrulingPropertyValue;
        if(typeof value !== "object") {
          if(majorSetProperties) {
            overrulingPropertyValue = majorSetProperties[key]
          }
          if(overrulingPropertyValue !== undefined) {
            delete minorSetProperties[key];
            minorChanged = true;
            if(overrulingPropertyValue === value) {
              delete majorSetProperties[key];
              majorChanged = true
            }
          }else {
            if(majorRemovedPropertyNames.indexOf(key) !== -1) {
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
  function dropOverruledAndUnneededProperties(minorSet, minorRem, majorSet, majorRem, propertiesName) {
    var minorSP = minorSet ? minorSet[propertiesName] : null, minorRP = minorRem ? minorRem[propertiesName] : null, majorSP = majorSet ? majorSet[propertiesName] : null, majorRP = majorRem ? majorRem[propertiesName] : null, result;
    result = dropOverruledAndUnneededAttributes(minorSP, minorRP, majorSP, majorRP);
    if(minorSP && !hasProperties(minorSP)) {
      delete minorSet[propertiesName]
    }
    if(minorRP && !hasRemovedProperties(minorRP)) {
      delete minorRem[propertiesName]
    }
    if(majorSP && !hasProperties(majorSP)) {
      delete majorSet[propertiesName]
    }
    if(majorRP && !hasRemovedProperties(majorRP)) {
      delete majorRem[propertiesName]
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
      dropResult = dropOverruledAndUnneededProperties(minorSpec.setProperties, null, majorSpec.setProperties, null, "style:text-properties");
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
      dropOverruledAndUnneededProperties(minorSpec.setProperties, minorSpec.removedProperties, majorSpec.setProperties, majorSpec.removedProperties, "style:paragraph-properties");
      dropOverruledAndUnneededProperties(minorSpec.setProperties, minorSpec.removedProperties, majorSpec.setProperties, majorSpec.removedProperties, "style:text-properties");
      dropOverruledAndUnneededAttributes(minorSpec.setProperties || null, (minorSpec.removedProperties) || null, majorSpec.setProperties || null, (majorSpec.removedProperties) || null);
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
  var transformations;
  transformations = {"AddCursor":{"AddCursor":passUnchanged, "AddMember":passUnchanged, "AddStyle":passUnchanged, "ApplyDirectStyling":passUnchanged, "InsertText":passUnchanged, "MoveCursor":passUnchanged, "RemoveCursor":passUnchanged, "RemoveMember":passUnchanged, "RemoveStyle":passUnchanged, "RemoveText":passUnchanged, "SetParagraphStyle":passUnchanged, "SplitParagraph":passUnchanged, "UpdateMember":passUnchanged, "UpdateMetadata":passUnchanged, "UpdateParagraphStyle":passUnchanged}, "AddMember":{"AddStyle":passUnchanged, 
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
      transformResult = transformOpVsOp(opSpecsA.shift(), opSpecB);
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
var webodf_css = '@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace webodfhelper url(urn:webodf:names:helper);\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n@namespace svgns url(http://www.w3.org/2000/svg);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[webodfhelper|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n  /** Let\'s not draw selection highlight that overflows into the office|text\n   * node when selecting content across several paragraphs\n   */\n  background: transparent;\n}\n\noffice|document *::selection {\n  background: transparent;\n}\noffice|document *::-moz-selection {\n  background: transparent;\n}\n\noffice|text * draw|text-box {\n/** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\ndraw|frame {\n  /** make sure frames are above the main body. */\n  z-index: 1;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:"";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\noffice|text[webodfhelper|links="inactive"] text|a {\n    cursor: text;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n    pointer-events: none;\n}\n\ncursor|cursor > .caret {\n    /* IMPORTANT: when changing these values ensure DEFAULT_CARET_TOP and DEFAULT_CARET_HEIGHT\n        in Caret.js remain in sync */\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > .handle {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > .handle > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > .handle.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > .handle:after {\n    content: \' \';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n/** Input Method Editor input pane & behaviours */\n/* not within a cursor */\n#eventTrap {\n    height: auto;\n    display: block;\n    position: absolute;\n    width: 1px;\n    outline: none;\n    opacity: 0;\n    color: rgba(255, 255, 255, 0); /* hide the blinking caret by setting the colour to fully transparent */\n    overflow: hidden; /* The overflow visibility is used to hide and show characters being entered */\n    pointer-events: none;\n}\n\n/* within a cursor */\ncursor|cursor > #composer {\n    text-decoration: underline;\n}\n\ncursor|cursor[cursor|composing="true"] > #composer {\n    display: inline-block;\n    height: auto;\n    width: auto;\n}\n\ncursor|cursor[cursor|composing="true"] {\n    display: inline-block;\n    width: auto;\n    height: inherit;\n}\n\ncursor|cursor[cursor|composing="true"] > .caret {\n    /* during composition, the caret should be pushed along by the composition text, inline with the text */\n    position: static;\n    /* as it is now part of an inline-block, it will no longer need correct to top or height values to align properly */\n    height: auto !important;\n    top: auto !important;\n}\n\neditinfo|editinfo {\n    /* Empty or invisible display:inline elements respond very badly to mouse selection.\n       Inline blocks are much more reliably selectable in Chrome & friends */\n    display: inline-block;\n}\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: \' \';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: \'\u00d7\';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: \'\';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n    color: black;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n\n.selectionOverlay {\n    position: absolute;\n    pointer-events: none;\n    top: 0;\n    left: 0;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 15;\n}\n.selectionOverlay > polygon {\n    fill-opacity: 0.3;\n    stroke-opacity: 0.8;\n    stroke-width: 1;\n    fill-rule: evenodd;\n}\n\n.selectionOverlay > .draggable {\n    fill-opacity: 0.8;\n    stroke-opacity: 0;\n    stroke-width: 8;\n    pointer-events: all;\n    display: none;\n\n    -moz-transform-origin: center center;\n    -webkit-transform-origin: center center;\n    -ms-transform-origin: center center;\n    transform-origin: center center;\n}\n\n#imageSelector {\n    display: none;\n    position: absolute;\n    border-style: solid;\n    border-color: black;\n}\n\n#imageSelector > div {\n    width: 5px;\n    height: 5px;\n    display: block;\n    position: absolute;\n    border: 1px solid black;\n    background-color: #ffffff;\n}\n\n#imageSelector > .topLeft {\n    top: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topRight {\n    top: -4px;\n    right: -4px;\n}\n\n#imageSelector > .bottomRight {\n    right: -4px;\n    bottom: -4px;\n}\n\n#imageSelector > .bottomLeft {\n    bottom: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topMiddle {\n    top: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .rightMiddle {\n    top: 50%;\n    right: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\n#imageSelector > .bottomMiddle {\n    bottom: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .leftMiddle {\n    top: 50%;\n    left: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\ndiv.customScrollbars::-webkit-scrollbar\n{\n    width: 8px;\n    height: 8px;\n    background-color: transparent;\n}\n\ndiv.customScrollbars::-webkit-scrollbar-track\n{\n    background-color: transparent;\n}\n\ndiv.customScrollbars::-webkit-scrollbar-thumb\n{\n    background-color: #444;\n    border-radius: 4px;\n}\n';

