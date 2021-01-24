import React,{Component} from 'react'
import Searchbar from './searchbar'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import CartDetails from '../cartDetails';
import HomeIcon from '@material-ui/icons/Home';

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);



class navbar extends Component{
    constructor(props){
        super(props)
        this.state={
            openCartdetails : false
        }
    }

    handleClick = async()=>{
        await this.props.hidePage()
        this.setState(
            {openCartdetails : !this.state.openCartdetails}
            
        )
    }

    render(){
        return(
            <>
                <div className="navbar">
                    
                    <Searchbar searchBook={this.props.searchBook}/>
                    {this.state.openCartdetails?
                        <div className="cart">
                            <IconButton  onClick={()=>this.handleClick()}>
                                <HomeIcon style={{fontSize:"50px"}}/>
                                <span>Home</span>
                            </IconButton>
                        </div>
                    : 
                        <div className="cart">
                            <IconButton aria-label="cart" onClick={()=>this.handleClick()}>
                                <StyledBadge badgeContent={this.props.cartDetails.items} color="secondary">
                                    <ShoppingCartIcon style={{fontSize:"50px"}}/>
                                </StyledBadge>
                                <span>Cart</span>
                            </IconButton>
                        </div>
                    }
                </div>
                <div>
                    {this.state.openCartdetails && 
                        <CartDetails cartDetails={this.props.cartDetails}/>
                    }
                </div>
            </>
        )
    }
}

export default navbar