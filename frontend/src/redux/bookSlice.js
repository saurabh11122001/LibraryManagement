import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    allBooks: [],
    allBooksAdmin: [],
    singleBook: null,
    searchBookByText: "",
    allRequestedBooks: [],
    searchedQuery: "",
    categoryBook:[],
    allAppliedBooks:[],
  },
  reducers: {
    // actions
    setAllBooks: (state, action) => {
      state.allBooks = action.payload; // Corrected the field name from allJobs to allBooks
    },
    setSingleBook: (state, action) => {
      state.singleBook = action.payload; // Corrected the field name from singleJob to singleBook
    },
    setAdminBooks: (state, action) => {
      state.allBooksAdmin = action.payload;
    },
    setSearchBookByText: (state, action) => {
      state.searchBookByText = action.payload;
    },
    setAllRequestedBooks: (state, action) => {
      state.allPurchasedBook = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setCategoryBook: (state, action) => {
      state.categoryBook = action.payload;
    },
    setAllAppliedBooks: (state, action) => {
      state.allAppliedBooks = action.payload;
    },
  },
});

export const {
  setAllBooks,
  setSingleBook,
  setAdminBooks,
  setSearchBookByText,
  setAllRequestedBooks,
  setSearchedQuery,
  setCategoryBook,
  setAllAppliedBooks
} = bookSlice.actions;

export default bookSlice.reducer;
