const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = 3000

//MIDLEWARE 
app.use(cors())
app.use(express.json())


const uri =process.env.DATABASE_URI 
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




//! Firebase Admin verfy Code Start 
const firebaseVerify = async(req,res,next) => {

  const accessToken = req?.headers?.authorization;
  const token = accessToken.split(' ')[1]

  if(!token){
    return res.status(401).json({message:'Unauthorize Access!'})
  }

  try{
    
  }
  catch(er) {

  }

}
//! Firebase Admin verfy Code Start 



async function run() {
  try {
   
    await client.connect();
   
    const db = client.db('go-fly-DB')
    const userCollection = db.collection('users')

    //! All USER RELETED API START
    //insert user data after from login and register
    app.post('/user',firebaseVerify, async(req,res) => {
      try{
        const userData = req.body;
        userData.role = 'user';
        userData.createdAt = new Date().toLocaleDateString('en-BD') 

        const email = userData.email
        const exsitingUser = await userCollection.findOne({email})
        if(exsitingUser){
          return res.status(409).json({message: 'User Already Exsits'})
        }

        const result = await userCollection.insertOne(userData)
        res.json(result)
      }
      catch(er){
        console.log(er)
      }
    }); 
     //! All USER RELETED API END

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
