export default {
    parse: parse
};

function parse(text: string) : Array<string> {
    let rawStrings = splitText(text);

    let results = new Array<string>();
    rawStrings.forEach((rawString) => {
        let cleanString = removeAllNonAlphabetOrDigitCharacters(rawString);

        if (cleanString.length > 0) {
            results.push(cleanString);
        }
    });

    console.debug(results);
    return results;
}

/*
    TECH TALK
    This function initially seems a bit pointless. Why not just run `.trim().split(' ')` inline?
    Why make a whole function for this?

    Recently I've been reading Clean Code after having started commuting to work,
    and one part that stuck out at me was the concept of a consistent level of abstraction
    in functions. That is to say, we're doing very low-level stuff here - trimming, splitting by spaces, etc.
    The `parse` function is doing high-level stuff, orchestrating other functions in line. 
    With the trim-split removed, the function now reads much more like English, 
    and is understood very quickly. It becomes obvious and straightforward.
    
    Also: there's nothing to say there won't be more that needs to be done in the future with the
    splitting of text into an array of words. This offers the perfect place to do it without
    polluting the rest of the code.
*/
function splitText(text: string) : Array<string> {
    return text.trim().split(' ');
}

/*
    TECH TALK
    Phoooooar. Look at the size of that name.
    This illustrates a point, however: you know *precisely* what this function does at a glance.
    No mental translation involved. It reads like English.
    Huge function names are fine as long as they precisely signal what they're intended to do.
*/
function removeAllNonAlphabetOrDigitCharacters(rawString: string) : string {
    /* 
        Regex is lifted from StackOverflow. 
        Worth noting I did have the "whitelist" approach in mind first.
        Honest!
    */
    const ONLY_ALPHABET_AND_DIGITS_REGEXP = /[^\w\s]/gi;
    const SEPARATORS_AND_WHITESPACE_REGEXP = /[_\t\r\n]/gi;
    
    let cleanString = rawString;

    cleanString = cleanString.replace(ONLY_ALPHABET_AND_DIGITS_REGEXP, '');
    cleanString = cleanString.replace(SEPARATORS_AND_WHITESPACE_REGEXP, '');

    return cleanString;
}