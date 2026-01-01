#!/bin/bash

echo "Rebuilding site..."

# Supprimer l'ancien dossier public et le recréer
rm -rf public
mkdir public

# Copier les assets globaux
cp -r assets public/

# Copier tous les dossiers et fichiers contenus dans pages/
for dir in pages/*; do
    if [ -d "$dir" ]; then
        DEST="public/$(basename "$dir")"
        mkdir -p "$DEST"
        cp -r "$dir/"* "$DEST/"
    fi
done

# Parcourir toutes les pages HTML dans pages/ et sous-dossiers
shopt -s globstar
for page in pages/**/*.html; do
    FILE="${page#pages/}"        # chemin relatif pour public
    DIR=$(dirname "public/$FILE")
    mkdir -p "$DIR"

    echo -n "> building ${FILE}... "
    scripts/buildpage.sh "$page" > "public/$FILE"
    echo "done."
done

echo "Finished!"

