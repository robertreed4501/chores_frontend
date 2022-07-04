import React from "react";

export const Card = () =>{
    return(
        <div className="Card">
            <h3>Jayne's Chores</h3>
            <table>
                <tr>
                    <th>Chore</th>
                    <th>Done</th>
                </tr>
                <tr>
                    <td>Empty Little Trash Cans</td>
                    <td><input type="checkbox"/></td>
                </tr>
                <tr>
                    <td>Laundry</td>
                    <td><input type="checkbox"/></td>
                </tr>
                <tr>
                    <td>Gather Dishes</td>
                    <td><input type="checkbox"/></td>
                </tr>
                <tr>
                    <td>Clean Room</td>
                    <td><input type="checkbox"/></td>
                </tr>
                <tr>
                    <td>Cook a Meal</td>
                    <td><input type="checkbox"/></td>
                </tr>
            </table>
        </div>
    )
}
/*

<ul>
    <li></li>
    <li>Laundry</li>
    <li>Gather Dishes</li>
    <li>Clean Room</li>
    <li>Cook a Meal</li>
</ul>*/
