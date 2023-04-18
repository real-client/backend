import Model from "../models/partnerModel.js";

import dotenv from "dotenv";

dotenv.config();


 //get all the partner
 export async function getAllPartner(req, res, next) {
    console.log("database connected");
    try {
      const response = await Model.find().exec();
      res.status(200).send({ success: true, response });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
  

//get partner by id
export function getPartnerByID(req, res, next) {
    
        let { id } = req.params;
        Model.findOne({ _id: id })
        .then ((response)=>{
            if(!response){
                res.status(404).send({message:"partner not found"})
            }else{
                res.status(200).send({response})
            }
        })
        .catch((err)=>{
            res.status(500).send({message:err.message});
            next(err)
        });
}

// add new partner
export async function AddPartner (req, res) {
try{
    const model = new Model(
        {
        name: req.body.name,
        logo: req.body.logo,
}
    );
  
const ad = await  model.save()
console.log(ad);
        return res.status(201).send(ad)
    
      
} catch (err){
    res.status(500).send({err})
} 
}

//update partner
export function updatePartner(req, res, next) {
    let {id} = req.params;
    console.log(id)
    const nameN = req.body.name;
    const logoN = req.body.logo;
    if(nameN && logoN){
        console.log(nameN);
        console.log(logoN)
                          Model.updateMany(
                            {_id:id},
                            {
                                $set:{name:nameN},
                            },
                            {
                                $set:{logo:logoN}
                            }
                          )
                          .then((model)=>{
                            console.log(model)
                            res.status(200).send({message:"done"});

                          })
                          .catch((err) => {
                            res.status(500).send({message:err.message});
                          })
    }
}


//delete an partner by id
 export function deletePartner (req, res, next) {
    
        let { id } = req.params;
        Model.findByIdAndDelete(id).then((data) =>{
            if (!data){
                res.status(404).send({message:"partner not found"});
            }else{
                res.status(200).send({ success: true, message:"delete successfully" });
            }
        })
           
       .catch((err) => {
        res.status(500).send({message:"error deleting partner"})
       })
    }

    const partnerController = {
        getAllPartner,
        getPartnerByID,
        AddPartner,
        updatePartner,
        deletePartner,
    };
export default partnerController;