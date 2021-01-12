const shortid = require('shortid')

let users = [
    {
    id: shortid.generate(), // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane",  // String, required
    },

    {
        id: shortid.generate(),
        name: "Gabby Vicas",
        bio: "Another web developer"
    }
]