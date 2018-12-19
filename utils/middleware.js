const Post = require("../models/Post");
const keys = require("../config/keys");
const queryBuilder = require("../utils/queryBuilder");
const {
  ALL_POSTS,
  POSTS_BY_USER,
  POSTS_BY_TAG,
  POSTS_BY_DETAILS
} = require("../utils/constants");

const getQuery = (req, type) => {
  if (type === ALL_POSTS) {
    return {};
  } else if (type === POSTS_BY_USER) {
    return { user: req.params.id };
  } else if (type === POSTS_BY_TAG) {
    return {
      tags: {
        $all: req.params.tag
      }
    };
  } else if (type === POSTS_BY_DETAILS) {
    const { start, end, tags } = req.query;
    return queryBuilder(start, end, tags);
  }
};

const getPageData = query => {
  return (req, res, next) => {
    console.log("page", req.query.page);
    let currentPage = Number(req.query.page) || 1;
    Post.countDocuments(getQuery(req, query), (err, count) => {
      const paginateCount = keys.paginateCount;
      let skipAmt = currentPage * paginateCount - paginateCount;
      const totalPages = Math.ceil(count / paginateCount);
      console.log("count", count);

      //todo
      //if both dates match search 0 - 24 time
      if (currentPage > totalPages) {
        currentPage = 1;
        skipAmt = 0;
        let error = {
          success: true,
          paginateCount,
          count,
          message: "There are no posts matching your search criteria",
          items: []
        };
        return res.status(404).json(error);
      }

      req.pageData = { currentPage, paginateCount, count, skipAmt, totalPages };
      next();
    });
  };
};

module.exports = getPageData;
