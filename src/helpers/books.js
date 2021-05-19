import axios from "axios";

export async function fetchBooksSearch(searchTerm) {
  const url = "https://openlibrary.org/search.json?title=" + searchTerm;
    const res = await axios.get(url);
    return res.data.docs;
}

export function getSortedBooks(books, sortCriterion) {
  if (!sortCriterion) {
    return books;
  }
  if (!books) {
    return [];
  }

  let compareFn;
  switch (sortCriterion) {
    case 'publishDate':
      compareFn = (a, b) => getBookPublishDate(a) - getBookPublishDate(b);
      break;
    case 'title':
      compareFn = ((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      return books;
  }
  return books
    .sort(compareFn);
}

export function getBookPublishDate(book) {
  if (!book.publish_date || !book.publish_date.length) {
    return null;
  }
  return book.publish_date
            .map((date) => {
              const m = date.match(/\d{4}/);
              if (m) {
                return parseInt(m[0]);
              }
              return 9999;
            })
            .sort((a, b) => a-b)[0];
}

export function getBookUrl(book) {
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