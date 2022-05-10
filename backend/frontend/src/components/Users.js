import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";

function Users(){
    return(
        <div></div>
    )
}
//     const {id} = useParams();
//     let navigate = useNavigate();
//     const [roles, setRoles] = useState([]);
//     const updateUser = async () => {
//         if (/*ЧЕК БОКС СТОИТ НА РОЛЬ USER*/) {
//             roles.add({"name": "ROLE_USER"})
//         }
//         if (/*ЧЕК БОКС СТОИТ НА РОЛЬ ADMIN*/) {
//             roles.add({"name": "ROLE_ADMIN"})
//         }
//
//         try {
//             let token = JSON.parse(localStorage.getItem("user"));
//             await axios.put("http://localhost:8080/api/admin/users/" + id,
//                 {
//                     "roles":roles
//                 },
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 }
//             ).then((response) => {
//                 navigate("/admin/users")
//             })
//         } catch (err) {
//             console.error(err.message);
//         }
//     };
//
//     }
//
//     return(
//         <div>
//
//         </div>
//     )
// }

export default Users;