const cloudinary =require("cloudinary").v2

cloudinary.config({ 
  cloud_name: 'dfiznkfwy', 
  api_key: '785512854877935', 
  api_secret: '2jp3fGG_RwQhwVaEXhsp4zE9Vdk' 
});

// console.log(cloudinary)
module.exports=cloudinary;