const faker = require("faker");
const Post = require("../models/Post");

const fakePostDate = () => {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    console.log(faker.image.avatar());
    let post = new Post({
      user: "5bbcbbb77c7baa5a74e0be0f",
      caption: faker.lorem.sentence(),
      image_id: "https://picsum.photos/800?random",
      date: faker.date.recent(),
      tags: [
        faker.random.word().toLowerCase(),
        faker.hacker.noun().toLowerCase(),
        faker.hacker.noun().toLowerCase()
      ]
    });
    arr.push(post);
    // console.log(faker.image.avatar());
    // console.log(faker.name.findName(), faker.internet.email());
  }
  // Post.insertMany(arr)
  //   .then(posts => console.log(posts))
  //   .catch(err => console.log(err));
};

module.exports = fakePostDate;
