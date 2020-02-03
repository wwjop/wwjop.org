#!/bin/bash

declare -a AVAILABLE_PSYCH_UNITS=( "Scientific Foundations of Psych" "Biological Bases of Behavior"  "Sensation and Perception"  "Learning" "Cognitive Psychology" "Developmental Psychology" "Motivation, Emotion, and Personality" "Clinical Psychology" "Social Psychology" )

function read_num_authors {
    read -p "How many authors are there? " authors_count
    if ! [[ "$authors_count" =~ ^[0-9]+$ ]]; then
            echo "The number of authors must be an integer input."
            read_num_authors
    fi
}
 
read -p "What is the name of the article? " article_name

echo
read -p "At what school was the article written? " school_name

echo
read_num_authors
author_names=()
for ((i = 1 ; i <= $authors_count ; i++)); do
    echo "------ Author $i ------"
    read -p "Full Name (First Last): " author_name
    author_names+=($author_name)
done

echo
echo "Choose categories:"
selected_categories=()
for (( i=0; i<${#AVAILABLE_PSYCH_UNITS[@]}; i++ )); do
    read -p "${AVAILABLE_PSYCH_UNITS[$i]} (Y/N): " response 
    case "$response" in
        [yY][eE][sS]|[yY]) 
            selected_categories+=(${AVAILABLE_PSYCH_UNITS[$i]})
            ;;
        *)
            ;;
    esac
done