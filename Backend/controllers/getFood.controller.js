import Food from "../model/calorie.model.js";

export default async function getFood(req,res){

    


   try{
     const foods = await Food.find();

     console.log("this is teh foods"+ foods);

     res.json(foods);
   }catch(e){

    console.log("this is the error message",e.message());
    res.json( e.message);
   }





}