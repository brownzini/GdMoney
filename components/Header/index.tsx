//Components
import AccountMenu from "./AccountMenu";

const Header = (props:any) => {
    return (
        <header>
        <div className="logo">
          <img
            src="/assets/img/logo.png" 
            alt="Initial image"
          />
        </div>
        <AccountMenu
          currentPage={props.currentPage}
          token={props.token}
        />
      </header> 
    );
}

export default Header;