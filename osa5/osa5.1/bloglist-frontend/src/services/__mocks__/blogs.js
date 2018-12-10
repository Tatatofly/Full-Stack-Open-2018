const blogs = [
   {
    "_id": {
      "$oid": "5c0d1c23342d8806044c9254"
    },
    "title": "Go To Statement Considered Harmful",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    "likes": 22,
    "user": {
      "$oid": "5c07e0c19f254425c40265bf"
    }
   },
   {
    "_id": {
      "$oid": "5c0d1cd6d6874d2bc42f2ff1"
    },
    "title": "React patterns",
    "author": "Michael Chan ",
    "url": "https://reactpatterns.com/",
    "likes": 19,
    "user": {
      "$oid": "5c0d1ca4d6874d2bc42f2ff0"
    }
   }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }