//Components
import AccountMenu from "./AccountMenu";

const Header = (props:any) => {
    return (
        <header>
        <div className="logo">
          <img
            src="/assets/img/economia.png" 
            alt="Initial image"
          />
        </div>
        <AccountMenu 
          currentPage={props.currentPage} 
        />
      </header> 
    );
}

export default Header;