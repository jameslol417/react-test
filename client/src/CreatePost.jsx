import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { createPost } from "./api/posts"
import Post from "./Post"

export function CreatePost({ setCurrentPage }) {
  const titleRef = useRef()
  const bodyRef = useRef()
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    mutationFn: createPost, 
    // onSuccess: (data, variables, context), 
    // onError: (error, variables, context),
    // onSettled: (data, error, variables, context),
    // onSuccess: (data, variables, context) => {
    //     console.log(context)
    // },
    // onMutate: (variables) => { // before mutation fn
    //     return {hi: "Bye"}
    // },
    onSuccess: data => {
      queryClient.setQueryData(["posts", data.id], data) // set manually to cache
    //   queryClient.invalidateQueries(["posts"]) // every query key under is affected
      queryClient.invalidateQueries(["posts"], { exact: true }) // every array that starts with post
      setCurrentPage(<Post id={data.id} />)
    },
  })

  function handleSubmit(e) {
    e.preventDefault()
    // calls the mutation function -> createPost({})
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    })
  }

//   createPostMutation.status === "idle" //as well as boolean versions
    // createPostMutation.mutateAsync().then(() => {

    // })

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  )
}