import React from 'react';
import Navbar from './components/navbar/navbar'
import Card from './components/card'
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import TablePagination from '@material-ui/core/TablePagination';
import Rating from 'material-ui-rating'
import RefreshIcon from '@material-ui/icons/Refresh';

import './App.css'



class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
        url           : "https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json",
        booksList     : [],
        filterTemp    : [],
        count         : 0,
        filteredList  : [],
        perPage       : 12,
        starValue     : 0,
        star1         : [],
        star2         : [],
        star3         : [],
        star4         : [],
        star5         : [],
        cart          : {items:0,details:[],sum :0},
        hide          : false
        
    }
  }

  callAPI = (url)=>{
      fetch(url).then(function(response){
        return response.json();
      }).then(data=>{
        var star1 = data.filter(book=>Math.ceil(book.average_rating) === 1)
        var star2 = data.filter(book=>Math.ceil(book.average_rating) === 2)
        var star3 = data.filter(book=>Math.ceil(book.average_rating) === 3)
        var star4 = data.filter(book=>Math.ceil(book.average_rating) === 4)
        var star5 = data.filter(book=>Math.ceil(book.average_rating) === 5)
        this.setState({
          booksList     : data,
          filterTemp    : data,
          count         : Math.ceil(data.length/this.state.perPage),
          filteredList  : data.slice(0,this.state.perPage),
          star1,
          star2,
          star3,
          star4,
          star5,
        })
      })
    }

    hidePage =()=>{
      this.setState({
        hide  : !this.state.hide
      })
    }

  componentDidMount = async ()=>{
    await this.callAPI(this.state.url)
  }

  handlePages = (event,page)=>{
    var filteredList = this.state.filterTemp.slice(this.state.perPage*(page-1),this.state.perPage*page)
    this.setState({
      filteredList,
    })
  }

  setValue = (newvalue)=>{
    var temp = "star"+Math.floor(newvalue)
    var filterTemp = this.state[temp]
    this.setState({
      filterTemp,
      starValue     : newvalue,
      filteredList  : filterTemp.slice(0,this.state.perPage),
      count         : Math.ceil(filterTemp.length/this.state.perPage)
    })
  }

  refresh = ()=>{
    this.setState({
      starValue     : 0,
      filterTemp    : this.state.booksList,
      count         : Math.ceil(this.state.booksList.length/this.state.perPage),
      filteredList  : this.state.booksList.slice(0,this.state.perPage),
    })
  }

  searchBook = async(event)=>{
    console.log(event.target.value)
    var filterTemp = this.state.booksList.filter((book)=>{
      if(typeof(book.title) === "string" && (book.title).includes(event.target.value)){
        return book
      }
      
    });

    this.setState({
      count         : Math.ceil(this.state.filterTemp.length/this.state.perPage),
      filteredList  : this.state.filterTemp.slice(0,this.state.perPage),
      starValue     : 0,
      filterTemp,

    })
  }

  handleCart = (book)=>{
    console.log(this.state.cart)
    var cart = this.state.cart;
    cart.sum = book.price+cart.sum;
    cart.items = cart.items+1;
    cart.details.push(book)
    this.setState({
      cart,
    })
  }


  render(){
    return (
      <div className="App">
        <Navbar searchBook={this.searchBook} hidePage={this.hidePage} cartDetails={this.state.cart}/>  
        {!(this.state.hide) && 
         <div>
           
         <Grid container spacing={2}>
           <Grid item xs={2} className="filter">
             Filters
             <span style={{float:"right"}}>
               <RefreshIcon 
                 onClick = {()=>{this.refresh()}}
               />
             </span>
             <div>
               <Rating
                   name="simple-controlled"
                   value={this.state.starValue}
                   max={5}
                   onChange={(value) => this.setValue(value)}
                     
               />
             </div>
             <div>
               
             </div>
             
 
 
           </Grid>
           
           <Grid  xs={10} className="CardContainer" spacing={2}>

             {this.state.filteredList.length === 0 ?
               <h1 style={{justifyContent:"center"}}>
                 NO DATA TO SHOW
               </h1>
             :
               this.state.filteredList.map((data,index)=>(
                 <Card bookDetails = {data} key={index} handleCart={this.handleCart} />
               ))
             }
            
           </Grid>
           
         </Grid>
         <div className="pagination">
           <Pagination 
           count={this.state.count} 
           variant="outlined" 
           shape="rounded" 
           onChange = {(e,p)=>this.handlePages(e,p)}
           />
         </div>
         </div>}
      </div>
    );
  }
}

export default App;
