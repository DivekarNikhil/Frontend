import axios from "axios";
import React, { useState } from "react";
import {
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    Button,
    Container,
    Input,
    Form,
    FormGroup
} from "reactstrap";
import base_url from "../api/bootapi";
import { toast } from "react-toastify";

const Course = ({ course, refreshCourses }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedCourse, setUpdatedCourse] = useState(course);

    // Delete function
    const deleteCourse = (id) => {
        axios.delete(`${base_url}/courses/${id}`).then(
            (response) => {
                toast.success("Course deleted successfully");
                refreshCourses();
            },
            (error) => {
                console.error("Error deleting course:", error);
                toast.error("Failed to delete course");
            }
        );
    };

    // Update function
    const updateCourse = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${base_url}/courses/${updatedCourse.id}`, updatedCourse);
            toast.success("Course updated successfully");
            setIsEditing(false);
            refreshCourses();  // Reload courses after update
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error("Failed to update course");
        }
    };

    return (
        <Card>
            <CardBody>
                {isEditing ? (
                    <Form onSubmit={updateCourse}>
                        <FormGroup>
                            <Input
                                type="text"
                                value={updatedCourse.title}
                                onChange={(e) => setUpdatedCourse({ ...updatedCourse, title: e.target.value })}
                                placeholder="Enter updated title"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="textarea"
                                value={updatedCourse.description}
                                onChange={(e) => setUpdatedCourse({ ...updatedCourse, description: e.target.value })}
                                placeholder="Enter updated description"
                            />
                        </FormGroup>
                        <Button color="success" type="submit">Save</Button>
                        <Button color="secondary" onClick={() => setIsEditing(false)} className="ml-2">Cancel</Button>
                    </Form>
                ) : (
                    <>
                        <CardSubtitle className="font-weight-bold">{course.title}</CardSubtitle>
                        <CardText>{course.description}</CardText>
                        <Container className="text-center">
                            <Button color="danger" className="mr-3" onClick={() => deleteCourse(course.id)}>
                                Delete
                            </Button>
                            <Button color="warning" onClick={() => setIsEditing(true)}>
                                Update
                            </Button>
                        </Container>
                    </>
                )}
            </CardBody>
        </Card>
    );
};

export default Course;
