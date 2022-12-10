export default function Posts({ currentItems }) {
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