import React,{useEffect, useState} from "react";
import './scss/custom.scss';
import useAxios from './utils/UseAxios';
import ReactPaginate from 'react-paginate';
import Posts from "./Posts";

function App() {
  const [postList, setPostList] = useState([]);
  const itemsPerPage = 10;
  const totalItems = 500; // as total 500 records coming from jsonplaceholder
  const pageCount = Math.ceil(totalItems/itemsPerPage);
  const [itemOffset, setItemOffset] = useState(0);
  const handlePageClick = (event) => {
    const newOffset = parseInt(event.selected + 1);
    setItemOffset(newOffset);
  }

  // get data from API 
  const { response, error, loading } = useAxios({
    method: 'get',
    url:`/comments?_page=${itemOffset}&_limit=${itemsPerPage}`,
  });

  // set data on every update
  useEffect(() => {
    if(response !== null){
      setPostList(response);
    }
  }, [response]);

  return (
    <div className="App">
      <h2 className="title">User Posts</h2>
      {
        loading ? (<div id="loader"></div>) :
        <div>
          { postList?.length ?
             <Posts currentItems={postList} /> : ""
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

export default App;
