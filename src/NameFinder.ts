import NameStruct from "./NameStruct.model";

export = {
    findNames: findNames
};

function findNames(nameStruct: NameStruct, content: string) : Object {
    let resultObj = {};
    
    nameStruct.firstNames.forEach((firstname) => {
        if (content.indexOf(firstname) != -1) {
            if (resultObj[firstname] === undefined) {
                resultObj[firstname] = 0;
            }
    
            resultObj[firstname]++;
        }
    });

    return resultObj;
};