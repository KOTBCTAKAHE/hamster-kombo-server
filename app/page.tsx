// app 
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ComboResponse {
    combo: string[];
    date: string;
}

interface Card {
    id: string;
    name: string;
}

const Combo: React.FC = () => {
    const [combo, setCombo] = useState<string[]>([]);
    const [date, setDate] = useState<string>('');
    const [cardNames, setCardNames] = useState<string[]>([]);

    useEffect(() => {
        const fetchCombo = async () => {
            try {
                const comboResponse = await axios.get<ComboResponse>('https://hamster-kombo-server.vercel.app/api/GetCombo');
                setCombo(comboResponse.data.combo);
                setDate(comboResponse.data.date);

                const cardsResponse = await axios.get<Card[]>('https://raw.githubusercontent.com/KOTBCTAKAHE/hamster-kombo-server/dev/allcardids.json');
                const cardNamesMap: { [key: string]: string } = {};
                cardsResponse.data.forEach(card => {
                    cardNamesMap.card.id = card.name;
                });

                const names = comboResponse.data.combo.map(id => cardNamesMap[id]);
                setCardNames(names);
            } catch (error) {
                console.error('Error fetching combo data:', error);
            }
        };

        fetchCombo();
    }, []);

    return (
        <div>
            <h1>Вот сегодняшнее комбо!</h1>
            <div>{cardNames.length > 0 && cardNames.map((name, index) => (
                <div key={index}>{name}</div>
            ))}</div>
            <p>Дата: {date}</p>
        </div>
    );
};

export default Combo;
