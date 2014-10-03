documents
=========

Documents app for ownCloud

An ownCloud app to work with office documents alone and/or collaboratively.

[![Build Status](https://travis-ci.org/owncloud/documents.svg?branch=master)](https://travis-ci.org/owncloud/documents)

### Known issues ###
**Problem**: Editor doesn't open. Spinner spins for ages.  
**Solution**: Try to disable gzip for Documents app by adding the following line to your .htaccess:  
`SetEnvIf Request_URI .*/apps/documents/ajax/.* no-gzip dont-vary`

**Problem**: Doc(x) support doesn't work  
**Solution**: Install at least  `libreoffice-common` and  `libreoffice-writer` packages for your distro.  
If you don't want to mess around with dependencies, you need simply install `unoconv` package. It will do the trick for you.

### How to add more fonts ###
+ Upload font files to **documents/css/fonts** directory
+ Edit **documents/css/fonts.css** adding `@font-face` rule for each uploaded file 
