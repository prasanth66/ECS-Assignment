import React,{Component} from 'react'
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';



class searchbar extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(

                <div className="search">
                    <span >
                    <TextField id="outlined-basic" label={<SearchIcon />} 
                        variant="outlined"  normal
                        onChange = {(e)=>this.props.searchBook(e)}
                    />
                    </span>
                </div>

        )
    }
}

export default searchbar