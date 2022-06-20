interface Props {
  product_name:string;
  status:string;
  date:string;   
}

export default function Table ({
    product_name,
    status,
    date
}:Props) {
    return (
      <div className="table-content"> 
        <div className="table-item-product-name"> {product_name} </div> 
        <div className="table-item-status"> {status} </div>
        <div className="table-item-data"> {date} </div> 
      </div> 
    )
}