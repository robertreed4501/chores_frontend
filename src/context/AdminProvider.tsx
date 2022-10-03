import { createContext, useState} from "react";
import Cookies, {get} from "js-cookie";
import axios from "axios";


export const AdminContext = createContext({});

type dashCard = [{
    userId: any
    name: String
    chores: [[{
        done: String
        firstName: String
        frequency: String
        groupId: any
        assignmentId: any
        id: any
        name: String
        userId: any
    }]]
}]

// @ts-ignore
export const AdminProvider = ({ children }) => {
    // @ts-ignore
    const [dashboard, setDashboard] = useState<dashCard>({});

    


    return (
        <AdminContext.Provider value={[dashboard, setDashboard]}>
            {children}
        </AdminContext.Provider>
    )
}