import React, {useState, useEffect} from "react";
import {DatePicker, Button, Alert, Select, Table} from 'antd';
import 'antd/dist/antd.css'
import axios from 'axios'

import "./style.css";

export default function App() {

  const {Option} = Select;

  const [selectedDate, setDate] = useState("");
  const [toggleAlert, setAlert] = useState(false);
  const [selectedState, setState] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const handleChange = (value)=>{
    setDate(value);
  }

  const showHideAlert = () =>{
    setAlert(!toggleAlert);
  }

  const onStateSelectChange = value => {
    setState(value);
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Body',
      dataIndex: 'body',
    },
  ];

  return (
    <div>
     <DatePicker style={{margin:'10px'}} onChange={handleChange}/>
     <br/>
     <Button type="primary" style={{ marginLeft: 8 }} onClick={showHideAlert}>
      Primary Button
    </Button>
    <br/>
    <br/>
    {
    toggleAlert && 
    <Alert style={{ marginLeft: 8 }}  message="Selected Date" description={selectedDate ? selectedDate.format('YYYY-MM-DD') : 'None'} />
    }

    <br/>
    <Select  style={{margin:'10px', width: 120 }} onChange={onStateSelectChange}>
      <Option value="KY">Kentucky</Option>
      <Option value="CA">California</Option>
      <Option value="IL">Illinois</Option>
      <Option value="NC">North Carolina</Option>
      <Option value="TX" disabled>
        Texas
      </Option>
      <Option value="CO">Colarado</Option>
    </Select>
    <br/>
    <Alert style={{ marginLeft: 8 }}  message="Selected State" 
      description={selectedState ? selectedState : 'None'} />

      <br/>
    <Table style={{ marginLeft: 8 }} columns={columns} dataSource={data} />

    </div>

  );
}
