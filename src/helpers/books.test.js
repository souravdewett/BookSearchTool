import { fetchBooksSearch, getBookPublishDate, getSortedBooks } from "./books";


describe("book stuff", () => {
  it("getSortedBooks", async () => {
    // const { getByText } = render(<App />);
    // expect(getByText(/Getting started with React testing library/i)).toBeInTheDocument();
    const books = await fetchBooksSearch('love');
    const sortedBooks = getSortedBooks(books);

    // console.log('books', books.map(b => `${b.title} ${b.extra_data}`).join('\n '));
    expect(sortedBooks).toHaveLength(books.length);
  });

  it("get publish date", async () => {
    const books = await fetchBooksSearch(`Love's Labour's Lost`);
    const date = getBookPublishDate(books[0]);

    // console.log('books', books.map(b => `${b.title} ${b.extra_data}`).join('\n '));
    expect(date).toBe(1598);
  });
});