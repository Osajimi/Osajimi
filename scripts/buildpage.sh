#!/bin/bash

function buildpage {
    PAGE="$1"
    FILE="${PAGE#pages/}"  

    # Extraire le titre (première ligne du HTML)
    TITLE=$(head -n 1 "$PAGE")

    # Date du jour
    DATE=$(date "+%d/%m/%Y")

    # Combiner les parties
    cat layout/before.html \
        | sed "s~{{TITLE}}~$TITLE~" \
        | sed "s~href=\"$FILE\"~& class=\"current\"~"

    # Contenu de la page
    tail -n +2 "$PAGE"

    # Ajouter le after
    cat layout/after.html \
        | sed "s~{{DATE}}~$DATE~"
}

# Vérifications
if [[ -z "$1" ]]; then 
    echo "Usage: ${0} PAGE" >&2
    exit 1
elif test ! -f "$1"; then 
    echo "${0}: error: ${1}: no such file" >&2
    exit 1
else 
    FILE="${1#pages/}"
    buildpage "$1" > "public/$FILE"
fi

