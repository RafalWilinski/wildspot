import React from "react";
import styled from "styled-components";

const Post = styled.div`
  width: 80%;
`;

const Title = styled.h3`
  margin-bottom: 0;
`;

const Date = styled.h4`
  margin: 0px;
  color: #aaa;
  font-size: 12px;
`;

export default ({ title, children, date }) => (
  <Post>
    <Title>{title}</Title>
    <Date>{date}</Date>
    <hr />
    <div>{children}</div>
  </Post>
);
