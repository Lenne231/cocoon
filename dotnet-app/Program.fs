open System
open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.Hosting
open Microsoft.AspNetCore.Http
open FSharp.Control.TaskBuilder
open System.Threading.Tasks


// let html (str: string) (ctx: HttpContext) =
//   task {
//     do! ctx.Response.WriteAsync str
//   } :> Task
    

let inline tag (name: string) (children: (HttpContext -> Task) list) (ctx: HttpContext) =
    task {
      do! ctx.Response.WriteAsync ("<" + name + ">")
      do! ctx.Response.WriteAsync ("</" + name + ">")
    } :> Task

let inline attr (name: string) (value: string) (ctx: HttpContext) =
    task {
      do! ctx.Response.WriteAsync ("<" + name + ">")
      do! ctx.Response.WriteAsync ("</" + name + ">")
    } :> Task

module a =
  let id = attr "id"

module h =


  let text (value: string) (ctx: HttpContext) = 
    task {
      do! ctx.Response.WriteAsync value
    } :> Task

  let html = tag "html"

  let head = tag "head"

  let body = tag "body"

  let div = tag "div"

  let h1 = tag "h1"

module route =
  let path (path: string) (children: (HttpContext -> Task) list) (ctx: HttpContext) = 
      task {
        do! ctx.Response.WriteAsync path
      } :> Task

  let segment (loader: string -> (HttpContext  -> Task) list) (ctx: HttpContext) = 
      task {
        return ()
      } :> Task

  let index (children: (HttpContext  -> Task) list) (ctx: HttpContext) = 
    task {
      return ()
    } :> Task

  let post (handle: 'input -> Task<'output>) (ctx: HttpContext) = 
    task {
      return ()
    } :> Task

  let load (handle: Task<(HttpContext  -> Task) list>) (ctx: HttpContext) =
    task {
      return ()
    } :> Task

open a
open h

let handle () =
  task { return () }

let home = [
      
  route.post <| fun (number: int) ->
    task {
      return number.ToString()
    }

  h1 [ text "Home" ]
]

let about = [
  h1 [ text "About" ]
]

let articles = [

  h1 [ text "Articles" ]

  route.index [
    h1 [ text "Index" ]
    route.load <|
      task {
        return []
      }
  ]

  route.segment <| fun id -> [
    h1 [ text ("Id: " + id) ]
    route.load <| task {
      return [
        h1 [ text "" ]
      ]
    }
  ]
]

let root = [
  h1 [ text "My App" ]
  div [
    id "main"
    route.path "home" home
    route.path "about" about
    route.path "articles" articles
  ]
]


[<EntryPoint>]
let main args =
    let builder = WebApplication.CreateBuilder(args)
    let app = builder.Build()

    app.Run(RequestDelegate(root))

    app.Run()

    0 // Exit code

