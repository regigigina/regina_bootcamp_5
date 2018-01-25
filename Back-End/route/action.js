const fs = require("fs");

var fetch = () => {
    try {
        return JSON.parse(fs.readFileSync("data.json"));
    } catch (error) {
        return [];
    }
};

var save = (obj) => {
    fs.writeFileSync("data.json", JSON.stringify(obj));
};

var addnew = (obj) => {
    arrayEntry = fetch();
    arrayEntry.push(obj);
    save(arrayEntry);
};

var detail = (obj) => {
    arrayEntry = fetch();
    result = {};
    
    for(i=0;i<arrayEntry.length;i++){
        if(arrayEntry[i].id==obj){
            result = arrayEntry[i];
            break;
        }
    }

    return result;
};

var addtocart = (obj) => {

    arrayCart = [];

    try {
        return arrayCart = JSON.parse(fs.readFileSync("cart.json"));
    } catch (error) {
        return arrayCart = [];
    }

    arrayCart.push(obj);
    fs.writeFileSync("cart.json", JSON.stringify(arrayCart));

    return arrayCart;
};

var category = (obj) => {
    arrayEntry = fetch();
    result = [];
    
    for(i=0;i<arrayEntry.length;i++){
        if(arrayEntry[i].category==obj){
            result.push(arrayEntry[i]);
        }
    }

    return result;
};

var update = (obj, id) => {
    arrayEntry = fetch();
    result = {};

    for(i=0;i<arrayEntry.length;i++){
        if(arrayEntry[i].id==id){
            result=arrayEntry[i];
            arrayEntry[i].name = obj.name ? obj.name : arrayEntry[i].name;
            arrayEntry[i].price = obj.price ? obj.price : arrayEntry[i].price;
            arrayEntry[i].category = obj.category ? obj.category : arrayEntry[i].category;
            arrayEntry[i].image = obj.image ? obj.image : arrayEntry[i].image;
            break;
        }
    }

    save(arrayEntry);
    return result;
};

var remove = (obj) => {
    arrayEntry = fetch();
    result = {};

    for(i=0;i<arrayEntry.length;i++){
        if(arrayEntry[i].id==obj){
            result = arrayEntry[i];
            arrayEntry.splice(i,1);
            break;
        }
    }

    save(arrayEntry);
    return result.title + " (" + result.id + ")";
}

module.exports = {
    fetch,
    save,
    addnew,
    category,
    detail,
    update,
    remove,
    addtocart
}