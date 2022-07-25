import {
    Link
} from "react-router-dom";
import { Nav, Button, Container } from 'react-bootstrap'

const Navbar = ({ login, logout, account, logoutText, connectButtonText }) => {
    

    const walletStyle = {color: "#4dfed4", borderColor: "#4dfed4"};

    return (

        <div className="navbar">
            <div className="logo">DAPP STUDIO</div>

            <div className="nav-menu">
                <Link className="nav-link" to="/">CREATE</Link>
                <Link className="nav-link" to="/explore">EXPLORE</Link>
                <Link className="nav-link" to="/my-nfts">MY NFTs</Link>
            </div>
        
            <div className="connection-div">
                <p className="logout" onClick={logout}>{logoutText}</p>
                <div className="wallet-div">
                    <button 
                        className="wallet-btn" 
                        style={account && walletStyle} 
                        onClick={login}>
                        {connectButtonText}
                    </button>
                    <p>{account ? account.substring(0,5) + "..." + account.substring(account.length - 5) : "Network : Rinkeby"}</p>
                </div>
            </div>
        </div>
        // <Navbar expand="lg" bg="secondary" variant="dark">
        //     <Container>
        //         <Navbar.Brand>
        //             DAPP STUDIO
        //         </Navbar.Brand>
        //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        //         <Navbar.Collapse id="responsive-navbar-nav">
        //             <Nav className="me-auto">
        //                 <Nav.Link as={Link} to="/">Home</Nav.Link>
        //                 <Nav.Link as={Link} to="/create">Create</Nav.Link>
        //                 <Nav.Link as={Link} to="/my-listed-items">My Listed Items</Nav.Link>
        //                 <Nav.Link as={Link} to="/my-purchases">My Purchases</Nav.Link>
        //             </Nav>
        //             <Nav>
        //                 {account ? (
        //                     <Nav.Link
        //                         href={`https://etherscan.io/address/${account}`}
        //                         target="_blank"
        //                         rel="noopener noreferrer"
        //                         className="button nav-button btn-sm mx-4">
        //                         <Button variant="outline-light">
        //                             {account.slice(0, 5) + '...' + account.slice(38, 42)}
        //                         </Button>

        //                     </Nav.Link>
        //                 ) : (
        //                     <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
        //                 )}
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
    )

}

export default Navbar;