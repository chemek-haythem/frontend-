import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { classTimetable } from './MockUpData/Mockuptim';
import { useParams } from 'react-router-dom';

const Timetable = () => {
    const { className } = useParams();
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/class/${className}/timetable`)
            .then(res => {
                setTimetable(res.data.timetable);
            })
            .catch(err => console.error('Error fetching timetable:', err));
    }, [className]);

    return (
        <div>
            <h2> {className} Timetable</h2>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Professor</th>
                        <th>Subject</th>
                    </tr>
                </thead>
                <tbody>
                    {timetable.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.Time}</td>
                            <td>{entry.Professor}</td>
                            <td>{entry.Subject}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Timetable;
