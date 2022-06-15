import Header from "../components/page/dashboard/Header";

const Marketplace = () => {
    return (
        <div className="main-dashboard">
        <section className="header">
          <Header currentPage="Marketplace" />
        </section>
        <section className="content"> 
          <div className="content-marketplace">
            <div className="content-title"> 
                <h1> Your collectables </h1>
            </div>
            <div className="content-filter"> 
                filter
            </div>
            <div className="content-marketplace-list"> 
                <ul> 
                    <li> elemento 1 </li>     
                    <li> elemento 1 </li> 
                    <li> elemento 1 </li> 
                    <li> elemento 1 </li> 
                </ul>
            </div>
          </div>
        </section>
      </div>
    );
}

export default Marketplace;