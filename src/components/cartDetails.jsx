import React ,{Component}from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


class CartDetails extends Component{
  constructor(props){
    super(props);
    this.state={
      arrowChange : false,
      id          : 0
    }
  }

  expandDetails = (details)=>{
    console.log(details)
    var arrowChange = details.bookID ===this.state.id ? false:true
    var id  = details.bookID ===this.state.id ? 0 : details.bookID
    this.setState({
      arrowChange ,
      id          ,
    })
  }

  render(){
    return(
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>BOOK TITLE</TableCell>
                <TableCell>BOOK AUTHOR</TableCell>
                <TableCell>BOOK PRICE</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.props.cartDetails.details.length===0 ? <div style={{textAlign:"center"}}><h1>NO DATA TO SHOW</h1></div>:
              this.props.cartDetails.details.map((row,index)=>(
                <>
                <TableRow key = {index}>
                  <TableCell
                    onClick = {()=>this.expandDetails(row)}
                  >
                    {(this.state.arrowChange && this.state.id=== row.bookID) ?<KeyboardArrowUpIcon />:<KeyboardArrowDownIcon />}
                    
                  </TableCell>
                  <TableCell>{row.title?row.title:"-"}</TableCell>
                  <TableCell>{row.authors?row.authors:"-"}</TableCell>
                  <TableCell>{row.price?row.price:"-"}</TableCell>
                  
                </TableRow>
                {this.state.arrowChange && this.state.id === row.bookID &&
                      <TableContainer style={{marginTop:"-10vw"}}>
                        <Table>
                          <TableHead>
                            <TableRow style={{backgroundColor:"greenyellow"}}>
                              <TableCell>Book Lang</TableCell>
                              <TableCell >Rating</TableCell>
                              <TableCell>ISBN Code</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>{row.language_code?row.language_code:"-"}</TableCell>
                              <TableCell style={{color:"gold"}}>{row.average_rating?row.average_rating:"-"}</TableCell>
                              <TableCell>{row.isbn?row.isbn:"-"}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    }
                </>

              ))}
            </TableBody>
            

          </Table>
        </TableContainer>
        {this.props.cartDetails.details.length>0 && 
          <div style={{textAlign:"center"}}>
            <h3>TOTAL PRICE = {this.props.cartDetails.sum}</h3>
          </div>
        }
      </div>
    )
  }
}

export default CartDetails;