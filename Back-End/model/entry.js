class entry{
    constructor(name, price, category, image){
        this.id = new Date().valueOf();
        this.name = name;
        this.price = price;
        this.category = category;
        this.image = image;
    }
};

module.exports = {
    entry
};