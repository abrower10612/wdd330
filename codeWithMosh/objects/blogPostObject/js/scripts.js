
// this is object literal syntax
let blog = {
  title: "Hello",
  body: "Hi, my name is Andrew",
  author: "Andrew Brower",
  views: 25,
  comments: [
    { author: "Lindsey", body: "Wow this blog is amazing" },
    { author: "Jake", body: "Yeah I agree" }
  ],
  isLive: true
}

// prints all of the properties of the object
console.log(blog);

// prints "Lindsey"
console.log(blog.comments[0].author);
 