import React, { useState } from 'react'
import './Tab.css'
import Stopwatch from '../Stopwatch/Stopwatch';
import PomodoroTimer from '../Pomodoro/Pomodoro';

const Tab = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const tabsData = [
        {
            label: 'Cronometro',
            content: <Stopwatch />
        },
        {
            label: 'Pomodoro',
            content: <PomodoroTimer/>
        },
    ];

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const buttonStyle = {
        backgroundColor: `${({ selected }) => selected ? '#fa0f26' : '#ad0a1a'}`
    };
    
    const renderTab = (tab, index) => {
        const isSelected = selectedTab === index;
    
        return (
            <div 
                className={`tab-button ${isSelected ? 'tab-button--selected' : ''}`} 
                key={tab.label} 
                onClick={() => setSelectedTab(index)} 
                selected={isSelected}
            >
            {tab.label}
            </div>
        );
      };
    
    const selectedTabContent = tabsData.find((tab, index) => index === selectedTab)?.content;
    
    
    return (
        <div className="container">
            <div className="tab-container">
                {tabsData.map(renderTab)}
            </div>
            <div className="tab-content">
                {selectedTabContent}
            </div>
        </div>
    );
}

export default Tab