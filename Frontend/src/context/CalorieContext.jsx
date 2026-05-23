
import { createContext, useContext, useState, useEffect } from "react";




const CalorieContext = createContext();

export const CalorieProvider = ({children})=>{

    const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("these are the entries", entries)

  const fetchEntries = async () => {
    try {
      const res = await fetch("http://localhost:3000/food");

      console.log("this is the res", res);
      const data = await res.json();

      setEntries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);






    return (
        <CalorieContext.Provider
        value={{entries,setEntries, fetchEntries, loading}}>
        {children}
        </CalorieContext.Provider>
    );
}

export const useCalorie = ()=>{
    return useContext(CalorieContext);
};