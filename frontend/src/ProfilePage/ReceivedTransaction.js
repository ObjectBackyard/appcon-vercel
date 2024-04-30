import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import {format } from "date-fns";

const ReceivedTransaction = () => {
  const [transactions, setTransactions] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(()=>{
    axios.get('https://akap-api.vercel.app/api/get-inbound-transactions?destination_id=6625a122fc13111100000001')
    .then((res) => {
        console.log(res.data, "inbound");
        if(res.data.success){
          setTransactions(res.data.data)
          setLoaded(true)
        }
      })
  }, [])


  return (
    <div className="overflow-x-auto">
   {!loaded ? <span className="loading loading-spinner loading-lg"></span> :
   transactions?.length === 0 || transactions === null ? <div>
    <p>No donations received yet</p>
   </div> : 
   <table className="table table-xs">
          <thead>
          <tr>
              {/* <th></th>  */}
              <th>Transaction id</th> 
              {/* <th>Sender</th>  */}
              <th>Amount</th> 
              <th>Date</th> 
              <th>Cause id</th>
          </tr>
          </thead> 
          <tbody>
        { transactions?.map((transaction, index)=>{
          return (
            <tr key={index}>
              {/* <th>1</th>  */}
              <td>{transaction._id}</td> 
              {/* <td>{}</td>  */}
              {/* <td>0xkalsdhjaslkdj</td>  */}
              <td>{transaction.amount_paid}</td> 
              <td>{format(transaction.date_created, "MMMM dd, YYYY")}</td> 
              <td>{transaction.cause_id}</td>
          </tr>
          );
        })  
          }

          </tbody> 
      </table>}
    </div>
  )
}

export default ReceivedTransaction
