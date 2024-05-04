#!/bin/bash
#
# Download font files and put them into the assets/fonts folder for the release
# SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
# SPDX-License-Identifier: AGPL-3.0-or-later
FONTLIST=(
    "https://github.com/google/fonts/raw/main/ofl/amaticsc/AmaticSC-Regular.ttf"
    "https://github.com/google/fonts/raw/main/ofl/amaticsc/AmaticSC-Bold.ttf"
    "https://github.com/google/fonts/raw/main/ofl/caveat/Caveat%5Bwght%5D.ttf"
    "https://github.com/google/fonts/raw/main/ofl/comfortaa/Comfortaa%5Bwght%5D.ttf"
    "https://github.com/google/fonts/raw/main/ofl/ebgaramond/EBGaramond%5Bwght%5D.ttf"
    "https://github.com/google/fonts/raw/main/ofl/lexend/Lexend%5Bwght%5D.ttf"
    "https://github.com/google/fonts/raw/main/ofl/lobster/Lobster-Regular.ttf"
    "https://github.com/google/fonts/raw/main/ofl/lora/Lora%5Bwght%5D.ttf"
    "https://github.com/google/fonts/raw/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf"
    "https://github.com/google/fonts/raw/main/ofl/nunito/Nunito%5Bwght%5D.ttf"
    "https://github.com/google/fonts/raw/main/ofl/oswald/Oswald%5Bwght%5D.ttf"
    "https://github.com/google/fonts/raw/main/ofl/pacifico/Pacifico-Regular.ttf"
    "https://github.com/google/fonts/raw/main/ofl/playfairdisplay/PlayfairDisplay%5Bwght%5D.ttf"
    "https://github.com/google/fonts/raw/main/ofl/roboto/Roboto%5Bwdth%2Cwght%5D.ttf"
    "https://github.com/google/fonts/raw/main/apache/robotomono/RobotoMono%5Bwght%5D.ttf"
    "https://github.com/google/fonts/raw/main/ofl/spectral/Spectral-Regular.ttf"
)

rm assets/fonts/*

function urldecode() { : "${*//+/ }"; echo -e "${_//%/\\x}"; }

for font in "${FONTLIST[@]}"; do
    echo "$font"
    wget -q -P assets/fonts/ $font

    FILENAME=$(urldecode "$(basename "$font")")

    if [[ $FILENAME == *"wght"* ]]; then
        NEWFILENAME=$(echo $FILENAME | sed 's/\[wght\]/-wght/g')
        NEWFILENAME=$(echo $NEWFILENAME | sed 's/\[wdth,wght\]/-wdtg-wght/g')
        mv assets/fonts/$FILENAME assets/fonts/$NEWFILENAME
    else
        NEWFILENAME=$(echo $FILENAME)
    fi

    echo "$FILENAME"
    FONTNAME=$(echo $NEWFILENAME | sed 's/.ttf//g')

    echo "$(dirname $font)/OFL.txt"
    wget -q -O "assets/fonts/$FONTNAME.LICENSE.txt" "$(dirname $font)/OFL.txt"
done
