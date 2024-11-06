import React, { useEffect } from "react";
import { Container, Button } from "reactstrap";

const Home = () => {

  useEffect(()=>{
    document.title="Home || Learncodewith Nikhil ";
  },[]);
  return (
    <div>
      <div className="text-center bg-light p-5 rounded">
        <h1>This is developed by Nikhil</h1>
        <p>This is developed by Nikhil for practice purposes. Hope you like my application.</p>
        <Container>
          <Button color="primary" outline>Start Using</Button>
        </Container>
      </div>
    </div>
  );
};

export default Home;
