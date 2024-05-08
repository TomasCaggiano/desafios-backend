const { connect } = require('mongoose')

exports.connectDB=()=>{
    connect(
    "mongodb+srv://tomascaggiano:nR3GJA9MJL4gzYjZ@ecommerce.danhyp1.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce"
  );
  console.log("base de datos conectada");
}