import React, { useState, useEffect, forwardRef  } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import axios from 'axios';

export default function Statistics() {
    // const data = [{name: 'Page A', quantity: 400}];
    const [data, setData] = React.useState([]);
    const [total, setTotal] = React.useState('');
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            'http://localhost:8000/api/transaction/calculate',
          );
      
          console.log(result.data.content);
          
       
          setData(result.data.content);
          setTotal(result.data.content[0].quantity - result.data.content[1].quantity);
        }
        
        fetchData();
      }, []);

  return (
    <div>
        <BarChart width={600} height={400} data={data}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="quantity" fill="#8884d8" barSize={30} />
        </BarChart>

        <h3>Balance total: {total}</h3>
    </div>
    
  );
}