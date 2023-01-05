#!/usr/bin/env bash

source_file=palabras.csv.gz

rm -f data/*
curl -OL https://cfenollosa.com/misc/$source_file --output-dir data
gzip -d data/$source_file
mlr --c2j --jlistwrap cat data/palabras.csv > data/words.json