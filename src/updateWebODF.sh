#!/bin/bash
# Copies the needed files from the build dir of the WebODF pullbox branch

WEBODF_BUILDDIR=${1%/}

if [ ! -d "$WEBODF_BUILDDIR" ]; then
   echo "Provide the toplevel build directory of WebODF pullbox branch."
        exit 1
fi
if [ ! -e "README.md" ]; then
   echo "Call me in the toplevel dir of OwnCloud Documents."
        exit 1
fi

# copy files

# webodf.js
cp "$WEBODF_BUILDDIR"/webodf/webodf.js ./js/3rdparty/webodf
cp "$WEBODF_BUILDDIR"/webodf/webodf-debug.js ./js/3rdparty/webodf
# dojo
cp "$WEBODF_BUILDDIR"/programs/editor/dojo-amalgamation.js ./js/3rdparty/webodf

# Tools, Editor, EditorSession, MemberListView:
cp "$WEBODF_BUILDDIR"/programs/editor/{Tools,Editor,EditorSession,MemberListView}.js ./js/3rdparty/webodf/editor
cp "$WEBODF_BUILDDIR"/programs/editor/server/owncloud/* ./js/3rdparty/webodf/editor/server/owncloud -R
cp "$WEBODF_BUILDDIR"/programs/editor/server/pullbox/* ./js/3rdparty/webodf/editor/server/pullbox -R
cp "$WEBODF_BUILDDIR"/programs/editor/server/ServerFactory.js ./js/3rdparty/webodf/editor/server -R
cp "$WEBODF_BUILDDIR"/programs/editor/widgets ./js/3rdparty/webodf/editor -R
cp "$WEBODF_BUILDDIR"/programs/editor/nls ./js/3rdparty/webodf/editor -R
cp "$WEBODF_BUILDDIR"/programs/editor/editor.css ./css/3rdparty/webodf

# dojo stuff
# TODO

# patches against upstream
patch -p1 -i src/patches/fontsCssPath.patch
