import React from 'react'
import {Card} from "./Card"


interface PersonalCardsProps{
	kids:string[]
}

export const PersonalCards = (kids:PersonalCardsProps) => {
	return(<div>
		{kids.kids.map(kid => <Card name={kid} />)}
		</div>
	) 
}