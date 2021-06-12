import styled from "styled-components";

export const Container = styled.section `
  display: ${(props) => props.display || "flex"};
  flex-direction: ${(props) => props.direction || "row"};
  align-items: center;
  justify-content: center;
  padding-top: ${(props) => props.top || "100px"};
`;

export const Content = styled.article `
  display: ${(props) => props.display || "flex"};
  flex-direction: ${(props) => props.direction || "row"};
  padding-top: ${(props) => props.top || "100px"};
`;

export const Formulary = styled.form `
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  width: ${(props) => props.width || "100%"};
  border: ${(props) => props.border || "none"};
  padding: 15px;
  background-color: ${(props) => props.bg || "#f6f8fa"};
  border-radius: 8px;
`;

export const Img = styled.img `
  height: ${(props) => props.he || "200px"};
  width: ${(props) => props.wi || "200px"};
  filter: drop-shadow(5px 5px 5px #222);
`;

export const Btn = styled.button `
  outline: none;
  background-color: ${(props) => props.bg || "transparent"};
`;