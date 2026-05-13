import Food from "../model/calorie.model.js";

export default async function deleteFood(req,res){

    const {id} = req.params;

    console.log("this is the id" + id);

    try{

        
    const deletedFood =
      await Food.findByIdAndDelete(id);

    res.json({
      message: "Deleted successfully",
      deletedFood
    });
        
    }catch(e){

        console.log("this is the error", e.message)

    res.status(500).json({
      error: e.message
    });
    }
    





}