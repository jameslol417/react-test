import { useState } from "react"
import PostsList1 from "./PostList1"
import PostsList2 from "./PostList2"
import Post from "./Post"
import { CreatePost } from "./CreatePost"
import { PostListPaginated } from "./PostListPaginated"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

const POSTS = [
  { id: 1, title: "Post 1"},
  { id: 2, title: "Post 2"}
]

// /posts -> ["posts"]
// /posts/1 -> ["posts", post.id]
// /posts?authorId=1 -> ["posts", {authorId: 1}]
// /posts/2/comments -> ["posts", post.id, "comments"]

export default function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />) // send component

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Posts List 2
      </button>
      <button
        // onMouseEnter={onHoverPostOneLink}
        onClick={() => setCurrentPage(<Post id={1} />)}
      >
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        Post List Paginated
      </button>
      <br />
      {currentPage}
    </div>
  )

}
  // const queryClient = useQueryClient()
  // const postsQuery = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: obj => wait(1000).then(() =>{
  //     console.log(obj)
  //     return [...POSTS]
  //   }),
  // })
  

  // const newPostMutation = useMutation({
  //   mutationFn: title => {
  //     return wait(1000).then(() => {
  //       POSTS.push({id: crypto.randomUUID(), title})
  //     })
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["posts"])
  //   }
  // })

//   if(postsQuery.isLoading) return <h1>Loading...</h1>
//   if(postsQuery.isError) {
//     return <pre>{JSON.stringify(postsQuery.error)}</pre>
//   }
//   return (
//     <div>
//       {postsQuery.data.map(post => (
//         <div key={post.id}>{post.title}</div>
//       ))}
//       {/* <button 
//       disabled={newPostMutation.isLoading}
//       onClick={() => newPostMutation.mutate("New Post")}>
//         Add New
//       </button> */}
//     </div>
//   )
// }

// function wait(duration) {
//   return new Promise(resolve => setTimeout(resolve, duration))
// }