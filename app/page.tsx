// app/page.tsx
import React from 'react';
import Combo from '../components/Combo';

const HomePage: React.FC = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Combo />
        </div>
    );
}

export default HomePage;
