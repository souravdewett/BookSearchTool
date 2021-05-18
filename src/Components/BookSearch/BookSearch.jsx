import {React,Component} from "react";
import axios from "axios";
import "./BookSearch.css";
import moment from "moment"

class BookSearch extends Component {
  constructor(props){
    super(props)
      this.state={
        bookName : [],
        titles: "",
        showLoading: false
      }
  }


  onChange = event => {
    this.setState({ 
      titles : event.target.value
    })
    console.log(event.target.value)
  };

  onSubmit = async () => {
    this.setState({ showLoading: true })
    const url = "http://openlibrary.org/search.json?title=" + this.state.titles;
    console.log(url);
    const res = await axios.get(url);
    console.log(res.data);
    // let temp = res.data.docs;
    // let temp_data = [];
    // for(let i in temp){
    //   console.log(temp[i])
    //   let curr = temp[i]
    //   temp_data =  [...curr, { extra_data: curr.publish_date[0] }]
      //console.log(temp[i], ...{ extra_data: temp[i].publish_date[0] })
    // }
    // console.log(temp_data)
    this.setState({ bookName: res.data.docs, showLoading: false });
    
  }

  getUrl = book => {
    let url;
    const { cover_i, olid, isbn, lccn, oclc } = book;
    if(isbn) url = `http://covers.openlibrary.org/b/isbn/${isbn && isbn[0]}-M.jpg`;
    else if(lccn) url=`http://covers.openlibrary.org/b/lccn/${lccn && lccn[0]}-M.jpg`;
    else if(oclc) url=`http://covers.openlibrary.org/b/oclc/${oclc && oclc[0]}-M.jpg`;
    else if(olid) url=`http://covers.openlibrary.org/b/olid/${olid && olid[0]}-M.jpg`;
    else if(cover_i) url=`http://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
    else url="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png";
    return url;
  }

  render() {
    return (

      
      <div className="center">     
            <input
              name="book"
              value={this.state.titles}
              onChange={this.onChange}
              type="text"
              placeholder="Enter the book Name"
              className="input-field"
            />
            <center>
              <button className="margin-top-16 btn center" onClick={this.onSubmit}>
              <span>Search it up!!!</span>
              </button>
            </center>
            <div className="flex">
              <button className="margin-left-16 margin-top-16 btn" onClick={() => {
                  this.setState({ bookName: this.state.bookName.sort((a, b) => a.title.localeCompare(b.title)) });
                }}>
                  <span>Sort By title </span>
              </button>
              
              <button className="margin-left-16 margin-top-16 btn" onClick={() => {
                  // this.setState({ bookName: this.state.bookName.sort((a, b) => a.title.localeCompare(b.title)) });
                }}>
                  <span>Sort By date</span>
              </button>
            </div>
            <div className="user-contanier">
                <h4 className="width-25">Cover:</h4>
                <h4 className="width-25">Title:</h4>
                <h4 className="width-25">Author(s):</h4>
                <h4 className="width-25">Date:</h4>
            </div>
            {/**/}
            {this.state.bookName && !this.state.showLoading ? this.state.bookName
              .sort((a,b) => b.extra_data - a.extra_data)
              .map((book,i) => 
              <div className="user-contanier">
                <div className="width-25"><img style={{ width: "200px", height: "200px" }} src={this.getUrl(book)} alt="NotFound" /></div>
                <h4 className="width-25">{book.title}</h4>
                <h4 className="width-25">{book.author_name && book.author_name.map(author => <p>{author}</p>)}</h4>
                <h4 className="width-25">{book.publish_date && book.publish_date.slice(0,1).map(date => <p>{moment(date).format("YYYY")}</p>)}</h4>

              </div>  
            ) : 
            <center>
            <div class="center loadingio-spinner-rolling-c8s3x287tkt">
              <div class="ldio-oxvz4l2w0hn">
                <div>
                </div>
              </div>
            </div>
            <div>Loading...</div></center>}
      </div>
    );
  }
}

export default BookSearch;