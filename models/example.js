const { Schema, model } = require("mongoose");

module.exports = model(
  "example",
  new Schema({
    SERVER: String,
    EXAMPLE: String,
  })
);

// Modeller hakkında daha fazla bilgi için: https://mongoosejs.com/docs/guide.html
// Vu4ll

/* 
Bu dosya için boş bir örnek

const { Schema, model } = require("mongoose");

module.exports = model(
  "Model adımız",
  new Schema({
    EXAMPLE: String, // Verilerimiz içi alanlar
  })
);
*/
