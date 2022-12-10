import {useEffect, useState} from "react";
import './scss/custom.scss';
import useAxios from './utils/UseGetList';
import React from 'react';
import ReactPaginate from 'react-paginate';

function App() {
  const [employeeList, setEmployeeList] = useState([]);
  const itemsPerPage = 10;
  const totalItems = 500; // as total 500 records coming from jsonplaceholder
  const pageCount = Math.ceil(totalItems/itemsPerPage);
  const [itemOffset, setItemOffset] = useState(0);
  const handlePageClick = (event) => {
    const newOffset = parseInt(event.selected + 1);
    console.log(`page number ${newOffset}`
    );
    setItemOffset(newOffset);
  }

  // get data from API 
  const { response, error, loading } = useAxios({
    method: 'get',
    url:`/comments?_page=${itemOffset}&_limit=${itemsPerPage}`,
  });

  // set data on every update
  useEffect(() => {
    console.log(response, "response");
    if(response !== null){
      setEmployeeList(response);
    }
  }, [response]);

  return (
    <div className="App">
      <h2 className="title">User Posts</h2>
      {
        loading ? (<p>Loading...</p>) :
        <div>
          { employeeList?.length ?
             <Items currentItems={employeeList} /> : ""
          }
          <div className="pagination">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next"
              onPageChange={handlePageClick}
              pageCount={pageCount}
              previousLabel="previous"
              renderOnZeroPageCount={null}
              pageRangeDisplayed={1}
              marginPagesDisplayed={2}
            />
          </div>
          {
            error && (<em className="error">{error.message}</em>)
          }
        </div>
      }
    </div>
  );
}


function Items({ currentItems }) {
  return (
    <>
      <table border={1} className="table-style">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length &&
          currentItems?.map((item) => (
            <tr key={item.id}>
              <td>{item?.id}</td>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>{(item?.body).substring(0,50)}{item?.body?.length > 50 ? '...' : "" }</td>
            </tr>
          ))}          
        </tbody>
      </table>
    </>
  );
}

export default App;
