export default function Pagination(props) {
  const pagination = [];
  for (
    let i = 0;
    i < Math.ceil(props.getProduct.length / props.productPerPage);
    i++
  ) {
    pagination.push(i + 1);
  }

  return (
    <div className="join">
      {pagination.map((item, index) => {
        return (
          <div key={index}>
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label={item}
              defaultChecked={item == 1 ? true : false}
              onClick={() => {
                props.handlePagination(item);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
