import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  if(!req.headers.authorization)  
    return res.status(404).json({ message: "User Not Logged" });
  try {
    //extact token, from complex req.headers structure
    const creator=req.headers.authorization?.split(" ")[0];
    // console.log(creator)
    const token = req.headers.authorization?.split(" ")[1];
    

    let decodedData;
    
    if (creator!=='Google') {      
        // decode ourCoustom token
      decodedData = jwt.verify(token, secret);

      // add "userId" to req
      req.userId = decodedData?.id; 
    } else {
      // decode googleToken
      decodedData = jwt.decode(token);
      // console.log( decodedData)
      // add "userId" (i.e. 'sub' for oAuth case) to req
      req.userId = decodedData?.sub;
    }    
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;