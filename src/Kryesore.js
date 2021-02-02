import React,{useEffect} from 'react'
import { Table ,Popconfirm} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import ModalData from './ModalData';
import ModalStatus from './ModalStatus';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useStateValue } from "./StateProvider";

function Kryesore() {
    const [{ basket,user }, dispatch] = useStateValue();
    const columns = [
        { title: 'Name', dataIndex: 'emri', key: 'emri'},
        { title: 'subjekti', dataIndex: 'subjekti', key: 'nr'} ,
        { title: 'Nr.cel', dataIndex: 'nr', key: 'nr',
       sorter: (a, b) => a.nr - b.nr,},
        { title: 'Qyteti', dataIndex: 'qyteti', key: 'qyteti',
        filters: [
            {
              text: 'Vlore',
              value: 'Vlore',
            },
            {
              text: 'Tirane',
              value: 'Tirane',
            },
            {
                text: 'Elbasan',
                value: 'Elbasan',
              },
          ],
          onFilter: (value, record) => record.qyteti.indexOf(value) === 0,
    },
    
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record) =><div ><ModalData record={record}/>{" "}
             <Popconfirm 
             onConfirm={()=>{
              axios.post(`http://localhost:3090/${record._id}`)
              dispatch({
               type:'DELETE_ITEM',
               id:record._id
              })
            }}
             icon={<QuestionCircleOutlined 
             style={{ color: 'red' }} />}>
            <a href="#">Delete</a>
          </Popconfirm>
            </div>,
          },
          {
            title: 'Action',
            dataIndex: '',
            key: 'y',
            render: (record) =><div > <ModalStatus record={record}/>
            </div>,
          },
          { title: 'Modifikuesi', dataIndex: 'user', key: 'user'} ,

        
        
      ];

const expandable = { expandedRowRender: record => <p style={{ margin: 0 }}> {record.komenti}</p> };


  
useEffect(async() => {
    const response = await axios.get('http://localhost:3090/data');
    dispatch({type:'MERR_TEDHENA',item:response.data,user:localStorage.getItem('user')})
    
   }, [])
  
    return (
        
        <div>
        <Table
        
            bordered={true}
            size= 'default'
            expandable={expandable}
            bottom= 'bottomRight'
            columns={columns}
            dataSource={basket}
        />
        </div>
    )
}

export default Kryesore
