import React, { useState, useEffect, forwardRef  } from 'react';
import Typography from '@material-ui/core/Typography';
import MaterialTable, { Column } from 'material-table';
import axios from 'axios';

import { 
  AddBox, 
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from "@material-ui/icons";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function ListTransaction() {
  const [columns, setColumns] = React.useState([
    { title: 'ID', field: 'id' },
    { title: 'Descripción', field: 'description' },
    { title: 'Tipo de transacción', field: 'transaction_type_id' },
    { title: 'Cantidad', field: 'quantity' },
  ]);
  const [state, setState] = React.useState({
    data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8000/api/transaction/list',
      );
  
      console.log(result.data.content);
      
   
      setState({
        data: result.data.content.map((obj, index) => (
          {
            id: obj.id,
            transaction_type_id: obj.transaction_type_id == 1 ? 'Ingreso' : 'Egreso',
            description: obj.description,
            quantity: obj.quantity
          }
        ))
      });
    }
    
    fetchData();
  }, []);

  return (
    <MaterialTable
      icons={tableIcons}
      title="Transacciones"
      columns={columns}
      data={state.data}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
              resolve();

              axios.delete('http://localhost:8000/api/transaction/delete/' + oldData.id)
                .then(res => {
                  console.log(res);
                  console.log(res.data);
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                })
          }),
      }}
    />
  );
}