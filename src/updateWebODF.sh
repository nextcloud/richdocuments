#!/bin/bash
# Copies the needed files from the build dir of the WebODF pullbox branch
#
# Prepare the webodf build dir by calling: make webodf-debug.js-target editor-compiled.js-target

if [ ! -e "README.md" ]; then
    echo "Call me in the toplevel dir of OwnCloud Documents."
    exit 1
fi

if [ $# -lt 1 ]; then
    echo "Usage : $0 prepare|copy|patch"
    exit 1
fi

WEBODF_BUILDDIR='build/'
WEBODF_SRCDIR='webodf/'

# create folders
function prepare(){
    if [ ! -d "$WEBODF_SRCDIR" ]; then
        git clone git@github.com:kogmbh/WebODF.git "$WEBODF_SRCDIR"
    else
        pushd "$WEBODF_SRCDIR"
        git pull --rebase
        popd
    fi

    if [ ! -d "$WEBODF_BUILDDIR" ]; then
       mkdir "$WEBODF_BUILDDIR"
    fi

    pushd "$WEBODF_BUILDDIR"
    cmake "../${WEBODF_SRCDIR}"
    make all webodf-debug.js-target build-wodocollabtexteditor
    popd
}

# copy sources
function copy_sources(){
    # webodf.js
    cp "$WEBODF_BUILDDIR"/webodf/webodf.js ./js/3rdparty/webodf
    cp "$WEBODF_BUILDDIR"/webodf/webodf-debug.js ./js/3rdparty/webodf
    # dojo
    cp "$WEBODF_BUILDDIR"/programs/editor/dojo-amalgamation.js ./js/3rdparty/webodf

    # Tools, Editor, EditorSession, MemberListView:
    cp "$WEBODF_BUILDDIR"/programs/editor/{Tools,Editor,EditorSession,MemberListView}.js ./js/3rdparty/webodf/editor
    cp "$WEBODF_BUILDDIR"/programs/editor/backend/pullbox/* ./js/3rdparty/webodf/editor/backend/pullbox -R
    cp "$WEBODF_BUILDDIR"/programs/editor/backend/ServerFactory.js ./js/3rdparty/webodf/editor/backend -R
    cp "$WEBODF_BUILDDIR"/programs/editor/widgets ./js/3rdparty/webodf/editor -R
    cp "$WEBODF_BUILDDIR"/wodocollabtexteditor/wodo/{wodotexteditor,wodocollabpane}.css ./css/3rdparty/webodf
    
    cp "$WEBODF_BUILDDIR"/programs/editor/dojo/* ./js/3rdparty/resources/dojo -R
    cp "$WEBODF_BUILDDIR"/programs/editor/dojox/* ./js/3rdparty/resources/dojox -R
    cp "$WEBODF_BUILDDIR"/programs/editor/dijit/* ./js/3rdparty/resources/dijit -R
    
    # files which need to be adapted manually:
    # "$WEBODF_BUILDDIR"/programs/editor/dojo-deps/src/app/resources/app.css  -> ./css/3rdparty/webodf/dojo-app.css
    # dojo-app.css has other paths then upstream, needs to be manually adapted to changes
    # also is dojo.css is not imported here, other than in upstream
}

# patches against upstream
function patch_sources(){
   patch -p1 -i src/patches/Patch-EditorSession.patch
   patch -p1 -i src/patches/Patch-MemberListView.patch
   patch -p1 -i src/patches/Patch-Tools.patch
   
   #Just for the record
   #patch -p1 -i src/patches/dojoStylesPill.patch
}

case "$1" in
    'prepare' )
        prepare ;;
    'copy' )
        copy_sources ;;
    'patch' )
        patch_sources ;;
esac
