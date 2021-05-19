import { React, Component } from "react";
import "./BookSearch.css";
import { getSortedBooks, getBookUrl, fetchBooksSearch, getBookPublishDate } from "../../helpers/books";

function Loading() {
  return (
    <center>
      <div class="center loadingio-spinner-rolling-c8s3x287tkt">
        <div class="ldio-oxvz4l2w0hn">
          <div></div>
        </div>
      </div>
      <div>Loading...</div>
    </center>
  );
}

function BookTableBody({ books, sortCriterion }) {
  return getSortedBooks(books, sortCriterion).map((book, i) => (
    <div className="user-contanier">
      <div className="width-25">
        <img
          style={{ width: "200px", height: "200px" }}
          src={getBookUrl(book)}
          alt="NotFound"
        />
      </div>
      <h4 className="width-25">{book.title}</h4>
      <h4 className="width-25">
        {book.author_name && book.author_name.map((author) => <p>{author}</p>)}
      </h4>
      <h4 className="width-25">
        {getBookPublishDate(book)}
      </h4>
    </div>
  ));
}

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      titles: "",
      showLoading: false,
      sortCriterion : null
    };
  }

  onChange = (event) => {
    this.setState({
      titles: event.target.value,
    });
    console.log(event.target.value);
  };

  onSubmit = async () => {
    this.setState({ showLoading: true });
    const books = await fetchBooksSearch(this.state.titles);
    this.setState({ books, showLoading: false });
  };

  render() {
    const { showLoading, sortCriterion ,books } = this.state;

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
        <div className="flex">
          <button
            className="margin-left-16 margin-top-16 btn"
            onClick={() => {
              this.setState({ sortCriterion: 'title' });
            }}
          >
            <span>Sort By title </span>
          </button>

          <button
            className="margin-left-16 margin-top-16 btn"
            onClick={() => {
              this.setState({ sortCriterion : 'publishDate' });
            }}
          >
            <span>Sort By date</span>
          </button>
          <div className="btn-alignment">
            <button
              className="margin-left-16 margin-top-16 btn"
              onClick={this.onSubmit}
            >
              <span>Search it up!!!</span>
            </button>
          </div>
        </div>
        
        <div className="user-contanier">
          <h4 className="width-25">Cover:</h4>
          <h4 className="width-25">Title:</h4>
          <h4 className="width-25">Author(s):</h4>
          <h4 className="width-25">Date:</h4>
        </div>
        {showLoading ? <Loading /> : <BookTableBody sortCriterion={sortCriterion} books={books} />}
      </div>
    );
  }
}

export default BookSearch;
