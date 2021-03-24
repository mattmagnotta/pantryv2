import styled from 'styled-components'
import {Link as Link} from 'react-router-dom'

export const Nav = styled.nav`
  background: transparent;
  height: 40px;
  /* margin-top: -80px; */
  display:flex;
  justify-content:center;
  align-items: center;
  font-size: 1.3rem;
  z-index:10;
  position:fixed;
  top:10px;
  width:100%;
  font-family: Futura, "Trebuchet MS", Arial, sans-serif;
  font-weight: 100;
  @media screen and (max-width:960px){
    transition: 0.8s all ease;
  }
`

export const NavbarContainer = styled.div `
  display:flex;
  justify-content:center;
  height:40px;
  width:100%;
  padding:0 24px;
  max-width:1100px;
  position: -webkit-sticky !important;

`

export const NavLogo = styled(Link)`
 color:white;
 justify-self: flex-start;
 cursor:pointer;
 font-size: 1.5rem;
 display:flex;
 align-items:center;
 margin-left:24px;
 font-weight:bold;
 text-decoration:none;

`
export const MobileIcon = styled.div`
  display:none;

  @media screen and (max-width:768px){
    display:flex;
    font-size:1.8rem;
    cursor:pointer;
    color:#fff;
    margin-left:99%;
    margin-top:7%;
  }
`

export const NavMenu = styled.ul`
  display:flex;
  align-items:center;
  list-style:none;
  text-align:center;


  @media screen and (max-width:768px){
    display:none;
  }
`

export const NavItem = styled.li`
 height:40px;
`
export const NavLinks = styled(Link)`
 color:black;
 display:flex;
 align-items:center;
 text-decoration:none;
 padding:0 1rem;
 height:100%;
 cursor:pointer;;
 &.active{
   border-bottom: 1px solid #fff;
 }
`
