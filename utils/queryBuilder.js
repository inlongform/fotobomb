const queryBuilder = (start, end, tags) => {
  const q = {
    date: {
      $gte: start,
      $lt: end
    }
  };

  if (tags) {
    q["tags"] = {
      $all: tags.split(",")
    };
  }

  return q;
};

module.exports = queryBuilder;
