import React from "react";

export const ChoreTable = () => {


    return(
        <table>
            <thead>
                <tr>
                    <th>Select</th>
                    <th>Chore</th>
                    <th>bla</th>
                    <th>bla</th>
                    <th>bla</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type={"checkbox"}/></td>
                    <td>Dishes</td>
                    <td>yup</td>
                    <td>yup</td>
                    <td>yup</td>
                </tr>
                <tr>
                    <td><input type={"checkbox"}/></td>
                    <td>Laundry</td>
                    <td>yup</td>
                    <td>yup</td>
                    <td>yup</td>
                </tr>
                <tr>
                    <td><input type={"checkbox"}/></td>
                    <td>Cook a Meal</td>
                    <td>yup</td>
                    <td>yup</td>
                    <td>yup</td>
                </tr>
            </tbody>
        </table>
    )
}