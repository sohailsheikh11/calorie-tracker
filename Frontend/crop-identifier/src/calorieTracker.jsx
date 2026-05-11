import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function CalorieTracker2() {

    const [image, setImage] = useState(null);

    const [items, setItems] = useState([{
        food_name: "chicken",
        extimated_calories: 500,
        protein: "36g",
        carbs: "58g",
        fat: "26g"
    }]);

    const handleImageChange = (e) => {

        // Get selected file
        const selectedImage = e.target.files[0];

        console.log("this is the selected image", selectedImage);

        setImage(selectedImage);
    };

     const handleUpload = async () => {

        if (!image) {
            alert("Please select image");
            return;
        }

        const formData = new FormData();

        formData.append("image", image);

        try {

            const response = await axios.post(
                "http://localhost:3000/api/food/analyze",
                formData
            );

            console.log("this is the data",response.data.data);
            console.log("this is the data",response.data.data.food_name);
            console.log("this is the data",response.data.data.estimated_calories);
            console.log("this is the data",response.data.data.protein);

            setItems([ response.data.data]);
            

        } catch (error) {

            console.log(error);

        }
    };

  

    return (
        <div
            style={{
                padding: "20px",
                fontFamily: "Arial"
            }}
        >

            <h1>Image Upload</h1>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />

            <br />
            <br />

            {
                image && (
                    <div>

                        <h3>Selected Image:</h3>

                        <p>Name: {image.name}</p>

                        <p>Type: {image.type}</p>

                        <p>
                            Size:
                            {" "}
                            {(image.size / 1024).toFixed(2)}
                            {" "}
                            KB
                        </p>

                        <img
                            src={URL.createObjectURL(image)}
                            alt="preview"
                            width="300"
                        />

                        <button onClick={handleUpload}>
                Upload Image
            </button>

                    </div>
                )
            }

            <ul>
                {items.map((item, index)=>(
                    <div key={index}>
                        <li>food name: {item.food_name}</li>
                        <li>protein: {item.protein}</li>
                        <li>carbs:{item.carbs}</li>
                        <li>estimated_calories:{item.extimated_calories}</li>
                    </div>
                ))}
            </ul>

        </div>
    );
}

export default CalorieTracker2;