
import NameFinder from '../src/NameFinder';

describe('success', () => {

    describe('first names', () => {
        test('finds single first name', () => {
            let TEST_CONTENT = 'My name is Fred';
            
            const results = NameFinder.findNames(['Fred'], TEST_CONTENT);
    
            expect(results).toEqual({ 'Fred': 1 });
        });
    
        test('finds multiple first names', () => {
            
            let TEST_CONTENT = 'My friends are Joe and Ted';
            
            const results = NameFinder.findNames(['Joe', 'Ted'], TEST_CONTENT);
    
            expect(results).toEqual({ 'Joe': 1, 'Ted': 1 });
        });
    
        test('returns match for found name and nothing for absent name', () => {
            
            let TEST_CONTENT = 'My friends are Joe and Ted';
            
            const results = NameFinder.findNames(['Joe', 'Nobody'], TEST_CONTENT);
    
            expect(results).toEqual({ 'Joe': 1 });
        });
    });

    describe('first + last names', () => {
        test.skip('finds a first and last name match', () => {
            
        });

        test.skip('does not include first name alone in results when found with a last name', () => {
            
        });

        test.skip('includes first name and first name + last name pair if found in one sentence', () => {
            
        });
    });
});

describe('failure', () => {
    test('returns blank object if nothing was found', () => {
        let TEST_CONTENT = 'My name is Fernando';
        
        const results = NameFinder.findNames(['Fred'], TEST_CONTENT);
    
        expect(results).toEqual({});
    });
});