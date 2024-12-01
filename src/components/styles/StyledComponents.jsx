import { keyframes, Skeleton, styled } from "@mui/material";
import {Link as LinkComponent} from "react-router-dom"
import { grayColor, matBlack } from "../../constants/color.js";


export const VisuallyHiddenInput = styled("input")({
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1
})

export const LinkStyle = styled(LinkComponent)`
    text-decoration: none;
    color: black;
    padding:"1rem";
    &:hover{
        background-color: rgba(0,0,0,0.1);
    }    
`

export const InputBox = styled("input")`
    border: none;
    outline: none;
    border-radius: 1.5rem;
    padding: 0 3rem;
    width: 100%;
    height:100%;
    background-color: ${grayColor}
    `;


export const SearchField = styled("input")`
    border: none;
    outline: none;
    border-radius: 1.5rem;
    padding: .8rem 2rem;
    width: 20vmax;
    background-color: ${grayColor};
    font-size: 1.2rem;
`

export const CurveButton = styled("button")`
    border: none;
    outline: none;
    border-radius: 1.5rem;
    padding: .8rem 1rem;
    width: 10vmax;
    background-color: ${matBlack};
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    &:hover{
        background-color: rgba(0,0,0,0.8);
    }
`

const bounceAnimation = keyframes`
  0% { transform: scale(1);}
  50% { transform: scale(1.5);}
  100% { transform: scale(1);}
`
export const BouncingSkeleton = styled(Skeleton)(()=>({
    animation: `${bounceAnimation} 1s infinite`
}))