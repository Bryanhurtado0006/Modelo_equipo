import { useEffect, useState } from "react"
import Navbar from "./components/Navbar";

const Home: React.FC = () => {
    const [emailLocalStorage,setEmailLocalStorage]=useState("")
    const [auth,setAuth]=useState("")
    //local permite saber si me he logueado o no 
    
    useEffect(()=>{
        const emaillocal=localStorage.getItem("email")
        const authlocal = localStorage.getItem("auth")
        console.log(authlocal);
        if(authlocal){//authlocal lleno
            setEmailLocalStorage
            setAuth(authlocal);
        }
    },[]);

  return(
        <div>
            {
                auth == "true"?(

                
                <>
                  <Navbar></Navbar>
                  <div>

                    <h1>WELCOME ⚽</h1>
                    <h1>Bienvenido al Gestor de Equipos y Presidentes</h1>
                    <p>{emailLocalStorage}</p>
                    <p>Administra tus equipos de fútbol y sus presidentes de manera sencilla. Crea, edita, lista y elimina información con esta aplicación </p>
                    <p>Navega usando el menú superior.</p>

                  </div>
                    
                </>
                )
                :
                (
                <div>
                    <h2>Usuario no logueado</h2>
                </div>
                )
            }
        </div>
    )
};

export default Home;