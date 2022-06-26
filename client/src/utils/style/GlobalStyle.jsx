import { createGlobalStyle } from 'styled-components'
import colors from './colors'


const GlobalStyle = createGlobalStyle`
    * {
        font-family : 'Lato', sans-serif;
    }
    html {
        width : 100%;
        height : 100%;
    }
    body {
        margin : 0;
        width : 100%;
        height : 100%;
        display : flex;
        color : ${colors.tertiary};
        background-color : #FFF;
    }
    #root {
        width : 100%;
        height : 100%;
    }
    h1 {
        font-weight : bold;
        font-size : 24px;
    }
    h2 {
        font-weight : bold;
        font-size : 20px;
    }
    ul {
        list-style-type : none;
    }
    li {
        width : 120px;
        height : 18px;
        text-align : center;
        color : ${colors.tertiary};
        cursor : pointer;
        border-radius : 12.5px;
    }
    .btn-active {
        width : fit-content;
        background-color : ${colors.tertiary};
        color : #FFF;
        border-radius : 20px;
        cursor : pointer;
    }
    .btn-active:hover {
        background-color : ${colors.secondary};
        color : ${colors.tertiary};
    }
    .log-btn {
        margin : 5px;
        width : 120px;
        border : 2px ${colors.tertiary} solid;
        background-color : ${colors.secondary};
        color : ${colors.tertiary}
    }
    .log-btn:hover {
        background-color : ${colors.primary};
        color : #FFF
    }
    .timestamps-style {
        width : fit-content;
        font-size : 11px;
        text-align : left
    }
    .like-btn, .dislike-btn {
        margin : 5px;
        width : 20px;
        height : 20px;
        cursor : pointer
    }
    .like-btn:active, .dislike-btn:active {
        margin : 5px;
        width : 20px;
        height : 20px;
        cursor : pointer
    }

`

const UseGlobalStyle = () => {

  return <GlobalStyle />;
};

export default UseGlobalStyle;
