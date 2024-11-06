import React, { useEffect, useState } from "react";
import Course from "./Course";
import base_url from "../api/bootapi";
import axios from "axios";
import { toast } from "react-toastify";

const Allcourse = () => {
    useEffect(() => {
        document.title = "All Courses";
    }, []);

    const [courses, setCourses] = useState([]);

    // Function to call server
    const getAllCoursesFromServer = async () => {
        try {
            const response = await axios.get(`${base_url}/courses`);
            // success
            console.log(response.data);
            toast.success("Courses have been loaded", {
                position: "bottom-center",
            });
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
            toast.error("Something went wrong", {
                position: "bottom-center",
            });
        }
    };

    // Calling loading course function
    useEffect(() => {
        getAllCoursesFromServer();
    }, []);

    // Refresh function to reload courses after update
    const refreshCourses = () => {
        getAllCoursesFromServer();
    };

    return (
        <div>
            <h1>All Courses</h1>
            <p>List of courses are as follows:</p>
            {courses.length > 0
                ? courses.map((item) => (
                    <Course key={item.id} course={item} refreshCourses={refreshCourses} />
                ))
                : "No Courses"
            }
        </div>
    );
};

export default Allcourse;
