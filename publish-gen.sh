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
read -p "What is the post date for the article? (Year-Month-Day; ex: 2020-01-25) " post_date

echo
read_num_authors
author_names=()
for ((i = 1; i <= $authors_count; i++)); do
    echo "------ Author $i ------"
    read -p "Full Name (First Last): " author_name
    author_names+=( "$author_name" )
done

echo
echo "Choose psych units:"
selected_categories=()
for (( i=0; i<${#AVAILABLE_PSYCH_UNITS[@]}; i++ )); do
    read -p "${AVAILABLE_PSYCH_UNITS[$i]} (Y/N): " response 
    case "$response" in
        [yY][eE][sS]|[yY]) 
            selected_categories+=( "${AVAILABLE_PSYCH_UNITS[$i]}" )
            ;;
        *)
            ;;
    esac
done

echo
echo "---- Article Information ----"
echo "Name: $article_name"
echo "School: $school_name"
echo "Post date (Year-Month-Day; ex: 2020-01-25): $post_date"

if (( ${#author_names[@]} > 0 )); then
    authors="${author_names[0]}"
    for ((i = 1; i <= ${#author_names[@]} - 1; i++)); do
        authors="$authors, ${author_names[$i]}"
    done
    echo "$authors_count authors: $authors"
else
    echo "0 authors"
fi

if (( ${#selected_categories[@]} > 0 )); then
    categories="${selected_categories[0]}"
    for ((i = 1; i <= ${#selected_categories[@]} - 1; i++)); do
        categories="$categories, ${selected_categories[$i]}"
    done
    echo "${#selected_categories[@]} psych units: $categories"
else 
    echo "0 psych units"
fi

echo
read -p "Is this information all correct? [Y/N]: " confirm
case "$confirm" in
    [yY][eE][sS]|[yY]) 
        ;;
    *)
        echo "Exiting..."
        exit
        ;;
esac

echo
echo "Generating files..."

_posts_file_name_article_name="$(tr [A-Z] [a-z] <<< "${article_name//\ /-}")"
_posts_file_name="$post_date-$_posts_file_name_article_name.html"
_posts_file="src/_posts/$_posts_file_name"
echo
echo "Post file location: $_posts_file"
touch "$_posts_file"

echo "---" >> "$_posts_file"
echo "title: '$article_name'" >> "$_posts_file"
if (( ${#author_names[@]} > 0 )); then
    authors="[ '${author_names[0]}'"
    for ((i = 1; i <= ${#author_names[@]} - 1; i++)); do
        authors="$authors, '${author_names[$i]}'"
    done
    authors="$authors ]"
    echo "authors: $authors" >> "$_posts_file"
fi
echo "school: '$school_name'" >> "$_posts_file"
echo "category: 'study'" >> "$_posts_file"
if (( ${#selected_categories[@]} > 0 )); then
    categories="[ '${selected_categories[0]}'"
    for ((i = 1; i <= ${#selected_categories[@]} - 1; i++)); do
        categories="$categories, '${selected_categories[$i]}'"
    done
    categories="$categories ]"
    echo "tags: $categories" >> "$_posts_file"
fi
echo "---" >> "$_posts_file"
echo >> "$_posts_file"