import NameStruct from '../src/models/NameStruct.model';

import NameCounter from '../src/NameCounter';

/*
    TECH TALK
    This `testFindNames` function is to eliminate the metric boatload 
    of duplication you usually find in test files, but also to start using a 
    "test language" right from the start instead of realising how useful one is later.

    This way we're expressing tests in terms of "this is what you've got, 
    this is what you're looking for, it should look like this". It's cleaner
    and automatically reduces duplication.

    Currently the function just executes `expect(results).toEqual(expectedObject)` 
    but if needs be we can pass in an evaluator object using bindings (or something
    to that effect) to make the function more extendable.
*/

function testFindNames(nameStruct: NameStruct, content: string, expectedObject: Object): void {
    const results = NameCounter.countNames(
        nameStruct,
        content
    );

    expect(results).toEqual(expectedObject);
}

describe('success', () => {

    describe('firstnames', () => {

        test('finds single firstname', () => {
            testFindNames(
                new NameStruct([], ['Fred'], []),
                'My name is Fred',
                { 'Fred': 1 }
            );
        });
    
        test('finds multiple firstnames', () => {
            testFindNames(
                new NameStruct([], ['Joe', 'Ted'], []),
                'My friends are Joe and Ted',
                { 'Joe': 1, 'Ted': 1 }
            );
        });
    
        test('returns match for found name and nothing for absent name', () => {

            testFindNames(
                new NameStruct([], ['Joe', 'Nobody'], []),
                'My friends are Joe and Ted',
                { 'Joe': 1 }
            );
        });
    });

    describe('firstname + lastname matching', () => {
        test('finds a first and lastname match', () => {
            testFindNames(
                new NameStruct([], ['Percy'], ['Simmons']),
                'My name is Percy Simmons',
                { 'Percy Simmons': 1 }
            );
        });

        test('includes firstname and firstname + lastname pair if found in one sentence', () => {
            testFindNames(
                new NameStruct([], ['Percy'], ['Simmons']),
                'My name is Percy Simmons, but my friends call me Percy',
                { 'Percy Simmons': 1, 'Percy': 1 }
            );
        });
    });

    describe('title + firstname + lastname matching', () => {
        test('returns match for title + firstname + lastname', () => {
            testFindNames(
                new NameStruct(['Dr'], ['Gregory'], ['Bloke']),
                'Good evening, I am Dr. Gregory Bloke',
                { 'Dr Gregory Bloke': 1 }
            );
        });
        test('example from test specification', () => {
            testFindNames(
                new NameStruct(['Mr'], ['Oliver', 'James'], ['Twist']),
                'Oliver Twist, was sometimes known as Oliver, but his full name was Mr. Oliver James Twist. For the sake of ease we will just call him Oliver.',
                { 'Oliver': 2, 'Oliver Twist': 1, 'Mr Oliver James Twist': 1 }
            )
        });
    });

        
});

describe('failure', () => {
    test('returns blank object if nothing was found', () => {
        testFindNames(
            new NameStruct(['Mr'], ['Fred'], ['Lagrange']),
            'My name is Bartholomew',
            { }
        );
    });
});