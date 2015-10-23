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

LOLEAFLET_SRCDIR='online/loleaflet/'
CLOUDSUITE_SRCDIR='loolvm/looldemo/assets/'

JS_TARGET='js/3rdparty/cloudsuite/'

# create folders
function prepare(){
    if [ ! -d "$LOLEAFLET_SRCDIR" ]; then
        git clone git://anongit.freedesktop.org/libreoffice/online
        ( cd online/loleaflet && npm install ) || exit 1
    else
        pushd "$LOLEAFLET_SRCDIR"
        git pull --rebase
        popd
    fi

    if [ ! -d "$CLOUDSUITE_SRCDIR" ]; then
        git clone ssh://git.internal.collabora.co.uk/git/productivity/loolvm.git
    else
        pushd "$CLOUDSUITE_SRCDIR"
        git pull --rebase
        popd
    fi

    ( cd "$LOLEAFLET_SRCDIR" && jake build && cd plugins/draw-0.2.4/ && jake build ) || exit 1
}

# copy sources
function copy_sources(){
    mkdir -p "$JS_TARGET"

    # loleaflet
    cp "$LOLEAFLET_SRCDIR"/dist/leaflet.js "$JS_TARGET"
    cp "$LOLEAFLET_SRCDIR"/plugins/draw-0.2.4/dist/leaflet.draw.js "$JS_TARGET"

    # loleaflet deps
    cp "$LOLEAFLET_SRCDIR"/dist/dialog/vex.combined.min.js "$JS_TARGET"
    cp "$LOLEAFLET_SRCDIR"/src/scrollbar/jquery.mCustomScrollbar.js "$JS_TARGET"

    # cloudsuite
    cp "$CLOUDSUITE_SRCDIR"/toolbar/cloudsuite.js "$JS_TARGET"
    cp "$CLOUDSUITE_SRCDIR"/toolbar/select2.min.js "$JS_TARGET"
    cp "$CLOUDSUITE_SRCDIR"/toolbar/w2ui.min.js "$JS_TARGET"

    # general
    ( cd "$JS_TARGET" && rm -f jquery.min.js && wget 'http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js' )
}

# patches against upstream
function patch_sources(){
    echo "Nothing for CloudSuite..."
}

case "$1" in
    'prepare' )
        prepare ;;
    'copy' )
        copy_sources ;;
    'patch' )
        patch_sources ;;
esac
