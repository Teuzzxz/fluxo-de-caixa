import { UserContext } from "./context/Usercontext.jsx"
import { useEffect, useContext, useState } from "react"
import "./style/admin.css"

export default function Admin() {
   const { http } = useContext(UserContext)
   const [users, setUsers] = useState([])

   const getUsers = async () => {
      const response = await fetch(http + "/admin/getUsers", {
         credentials: "include",
      })
      const res = await response.json()
      setUsers(res.users)
   }

   useEffect(() => {
      getUsers()
   }, [])

   return (
      <>
         <h1>Painel ADM</h1>
         <button
            onClick={() => {
               window.history.back()
            }}
         >
            Back
         </button>
         {users.map((e, p) => {
            return (
               <div key={p} style={{ border: "1px solid black" }}>
                  <p>{e.email}</p>
                  <p>{e.role}</p>
                  <p>
                     APPS:
                     {e.apps.map((e, p) => {
                        return <span key={p}>{e}</span>
                     })}
                  </p>
                  <p>{e.city}</p>
                  <p>{e.state}</p>
                  <p>{e.country}</p>
                  <p>{e._id}</p>
               </div>
            )
         })}
      </>
   )
}
