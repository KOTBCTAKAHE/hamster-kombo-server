"use client";

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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCombo = async () => {
            try {
                console.log('Fetching combo data...');
                const comboResponse = await axios.get<ComboResponse>('https://hamster-kombo-server.vercel.app/api/GetCombo');
                if (!comboResponse.data || !comboResponse.data.combo) {
                    throw new Error('Invalid combo response');
                }
                console.log('Combo data:', comboResponse.data);
                setCombo(comboResponse.data.combo);
                setDate(comboResponse.data.date);

                console.log('Fetching card names...');
                const cardsResponse = await axios.get<Card[]>('https://raw.githubusercontent.com/KOTBCTAKAHE/hamster-kombo-server/dev/allcardids.json');
                if (!cardsResponse.data || !Array.isArray(cardsResponse.data)) {
                    throw new Error('Invalid cards response');
                }
                console.log('Cards data:', cardsResponse.data);
                const cardNamesMap: { [key: string]: string } = {};
                cardsResponse.data.forEach(card => {
                    cardNamesMap[card.id] = card.name;
                });

                const names = comboResponse.data.combo.map(id => {
                    const name = cardNamesMap[id];
                    if (!name) {
                        throw new Error(`Card name not found for id: ${id}`);
                    }
                    return name;
                });
                setCardNames(names);
            } catch (error) {
                console.error('Error fetching combo data:', error);
                setError('Error fetching combo data.');
            }
        };

        fetchCombo();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Вот сегодняшнее комбо!</h1>
            <div>
                {cardNames.length > 0 ? (
                    cardNames.map((name, index) => (
                        <div key={index} style={{ fontSize: '18px', margin: '10px 0' }}>{name}</div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <p style={{ fontSize: '16px', marginTop: '20px' }}>Дата: {date}</p>
        </div>
    );
};

export default Combo;
