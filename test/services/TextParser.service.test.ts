import TextParser from '../../src/services/TextParser.service';

// See NameFinder.test.ts for an explanation of this pattern.
function testTextParser(text: string, expectedResult: Array<string>) {
    expect(TextParser.convert(text)).toStrictEqual(expectedResult);
}

describe('simple cases', () => {
    test('strips whitespace', () => {
        testTextParser(
            '   spaces    ', 
            ['spaces']
        );
    });
    
    test('strips special characters', () => {
        testTextParser(
            '] [ ? / < ~ # ` ! @ $ % ^ & * ( ) + = } | : \' ; , > {special] [ ? / < ~ # ` ! @ $ % ^ & * ( ) + = } | : \' ; , > {', 
            ['special']
        );
    });
});

/* 
    TECH TALK
    These test cases quickly become monstrously long.
    Frankly I don't think it's worth the effort of reducing them down, especially not at the moment.
*/
describe('complex cases', () => {
    test('Standard sentence', () => {
        testTextParser(
            'We scream! You scream! We all scream! For ice cream!',
            ['We', 'scream', 'You', 'scream', 'We', 'all', 'scream', 'For', 'ice', 'cream']
        );
    });

    test('List of quoted titles', () => {
        testTextParser(
            '‘The Traffic in Women: Notes on the “Political Economy” of Sex’; ‘Tradition and the Individual Talent’; ‘The Library Window’; ‘To His Coy Mistress’; ‘The Flower of Scotland’; ‘Judges’ (in Oranges Are Not the Only Fruit).',
            ['The', 'Traffic', 'in', 'Women', 'Notes', 'on', 'the', 'Political', 'Economy', 'of', 'Sex', 'Tradition', 'and', 'the', 'Individual', 'Talent', 'The', 'Library', 'Window', 'To', 'His', 'Coy', 'Mistress', 'The', 'Flower', 'of', 'Scotland', 'Judges', 'in', 'Oranges', 'Are', 'Not', 'the', 'Only', 'Fruit']
        );
    });

    test('Sentence from literature', () => {
        testTextParser(
            '“She’s too young, it’s too late, we come apart, my arms are held, and the edges go dark and nothing is left but a little window, a very little window, like the wrong end of a telescope, like the window on a Christmas card, an old one, night and ice outside, and within a candle, a shining tree, a family, I can hear the bells even, sleigh bells, from the radio, old music, but through this window I can see, small but very clear, I can see her, going away from me, through the trees which are already turning, red and yellow, holding out her arms to me, being carried away.”',
            ['Shes', 'too', 'young', 'its', 'too', 'late', 'we', 'come', 'apart', 'my', 'arms', 'are', 'held', 'and', 'the', 'edges', 'go', 'dark', 'and', 'nothing', 'is', 'left', 'but', 'a', 'little', 'window', 'a', 'very', 'little', 'window', 'like', 'the', 'wrong', 'end', 'of', 'a', 'telescope', 'like', 'the', 'window', 'on', 'a', 'Christmas', 'card', 'an', 'old', 'one', 'night', 'and', 'ice', 'outside', 'and', 'within', 'a', 'candle', 'a', 'shining', 'tree', 'a', 'family', 'I', 'can', 'hear', 'the', 'bells', 'even', 'sleigh', 'bells', 'from', 'the', 'radio', 'old', 'music', 'but', 'through', 'this', 'window', 'I', 'can', 'see', 'small', 'but', 'very', 'clear', 'I', 'can', 'see', 'her', 'going', 'away', 'from', 'me', 'through', 'the', 'trees', 'which', 'are', 'already', 'turning', 'red', 'and', 'yellow', 'holding', 'out', 'her', 'arms', 'to', 'me', 'being', 'carried', 'away']
        )
    })

    test('Dialogue example', () => {
        testTextParser(
            `‘Hi, Richard,’ she said, and spit out a mouthful of toothpaste. 
            ‘Hello,’ I said, setting to work on my tie.
            ‘You look cute today.’
            ‘Thanks.’`,
            ["Hi", "Richard", "she", "said", "and", "spit", "out", "a", "mouthful", "of", "toothpaste", "Hello", "I",
             "said", "setting", "to", "work", "on", "my", "tie", "You", "look", "cute", "today", "Thanks"]
        );
    });
});