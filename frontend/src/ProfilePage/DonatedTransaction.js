import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import {format } from "date-fns";


const DonatedTransaction = () => {
  const [transactions, setTransactions] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(()=>{
    axios.get('https://akap-api.vercel.app/api/get-outbound-transactions?source_id=6625a122fc13111100000001')
    .then((res) => {
        console.log(res.data, "outbound transactions");
        if(res.data.success){
          setTransactions(res.data.data)
          setLoaded(true)
        }
      })
  }, [])



  return (
    <div className="overflow-x-auto">
    {!loaded ? <span className="loading loading-spinner loading-lg"></span>
    : transactions?.length === 0 ? <div>
      <p>Did not donate yet</p>
    </div> : <table className="table table-xs">
        <thead>
        <tr>
            {/* <th></th>  */}
            <th>Transaction id</th> 
            <th>Amount</th> 
            <th>Date</th> 
            <th>Cause id</th>
        </tr>
        </thead> 
        <tbody>
          {transactions?.map((transaction, index)=>{
            return (
              <tr key={index}>
            <td>{transaction._id}</td> 
            <td>{transaction.amount_paid}</td> 
            <td>{format(transaction.date_created, "MMMM dd, YYYY")}</td> 
            <td>{transaction.cause_id}</td>
        </tr>
            );
          })}
        

        </tbody> 
    </table>}
    </div>
  )
}

export default DonatedTransaction
