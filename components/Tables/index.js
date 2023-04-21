import React, { useState } from 'react'
import MUIDataTable from "mui-datatables";

const columns = [
    {
      name: "pilot",
      label: "Pilot",
      options: {
        filter: true,
        sort: false,
      },
    },
  
    {
      name: "passengers",
      label: "Passengers",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: false,
      },
    }
  ];



const Tables = () => {

  const [responsive, setResponsive] = useState("standard");

  const options = {
    filterType: "none",
    responsive,
    selectableRows: "multiple",
    
    
  };
    
//   const rows = val?.map((item, index) => {
//     return {
//       pilot: <>{item.twitter}</>,
//       passengers: <>{item.passengers.length}</>,

//       status: (
//         <>
          
//         {item.status}
         
//         </>
//       ),
     
//     };
//   });
  return (
    <div>
          {/* <MUIDataTable data={rows} columns={columns} options={options} /> */}

    </div>
  )
}

export default Tables