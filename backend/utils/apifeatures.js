class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i", //this makes search case insensitive
                },
            }
            : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter() {
        const queryCopy = { ...this.queryStr }; //if we used directly this.queryStr then it would have passed by reference and any change in queryCopy would also reflect in original queryStr and we don't want that
        
        //Removing some fields for category
        const removeFields=["keyword","page","limit"];

        removeFields.forEach(key=> delete queryCopy[key]);

        //Filter for price and rating
        //gt and lt are used for range : but in mongo db operator it starts with $ 
        //that's why we have to change it 
        //http://localhost:4000/api/v1/products?keyword=product1&price[gte]=1200&price[lt]=2000
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=> `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    
    }
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage*(currentPage-1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;
