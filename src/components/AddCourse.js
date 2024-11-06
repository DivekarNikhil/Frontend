import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form, FormGroup, Input } from "reactstrap";
import { toast } from "react-toastify";
import base_url from "../api/bootapi";

const AddCourse = ({ onCourseAdded }) => {
  const [course, setCourse] = useState({ id: "", title: "", description: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
     // const response = await axios.post(`${base_url}/courses`, course);
     const response = await axios.post(`${base_url}/courses` ,course); // Assuming your Spring Boot endpoint is `/courses/`

      console.log("Course added:", response.data);
      toast.success("Course Added Successfully");
      setCourse({ id: "", title: "", description: "" });
      onCourseAdded(); // Call the callback to refresh the course list
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Failed to add course.");
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <FormGroup>
        <label htmlFor="userId">Course Id</label>
        <Input
          type="text"
          placeholder="Enter course id here"
          id="userId"
          value={course.id}
          onChange={(e) => setCourse({ ...course, id: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="title">Course Title</label>
        <Input
          type="text"
          placeholder="Enter title here"
          id="title"
          value={course.title}
          onChange={(e) => setCourse({ ...course, title: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="description">Course Description</label>
        <Input
          type="textarea"
          placeholder="Enter description here"
          id="description"
          style={{ height: 150 }}
          value={course.description}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
        />
      </FormGroup>
      <Container className="text-center">
        <Button type="submit" color="success">
          Add Course
        </Button>
        <Button
          type="reset"
          onClick={() => setCourse({ id: "", title: "", description: "" })}
          color="warning"
          className="ml-3"
        >
          Clear
        </Button>
      </Container>
    </Form>
  );
};

export default AddCourse;
