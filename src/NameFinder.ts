export = {
    findNames: findNames
};

function findNames(names: Array<string>, content: string) : Object {
    let resultObj = {};
    
    names.forEach((name) => {
        if (content.indexOf(name) != -1) {
            if (resultObj[name] === undefined) {
                resultObj[name] = 0;
            }
    
            resultObj[name]++;
        }
    });

    return resultObj;
};