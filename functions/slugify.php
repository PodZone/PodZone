<?php

function slugify($string){
	$strict = strtolower($string);
    $patterns[0] = '/[á|â|à|å|ä]/';
    $patterns[1] = '/[ð|é|ê|è|ë]/';
    $patterns[2] = '/[í|î|ì|ï]/';
    $patterns[3] = '/[ó|ô|ò|ø|õ|ö]/';
    $patterns[4] = '/[ú|û|ù|ü]/';
    $patterns[5] = '/æ/';
    $patterns[6] = '/ç/';
    $patterns[7] = '/ß/';
    $replacements[0] = 'a';
    $replacements[1] = 'e';
    $replacements[2] = 'i';
    $replacements[3] = 'o';
    $replacements[4] = 'u';
    $replacements[5] = 'ae';
    $replacements[6] = 'c';
    $replacements[7] = 'ss';

    $strict = preg_replace($patterns, $replacements, $strict);
    return $strict;
}